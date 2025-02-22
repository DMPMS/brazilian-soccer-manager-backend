import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetitionglobalEntity } from './entities/competitionglobal.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { RuleService } from 'src/rule/rule.service';
import { CreateCompetitionglobalDTO } from './dtos/createCompetitionglobal.dto';
import { UpdateCompetitionglobalDTO } from './dtos/updateCompetitionglobal.dto';
import { CompetitionglobalTeamglobalService } from 'src/competitionglobal_teamglobal/competitionglobal_teamglobal.service';
import { TeamglobalService } from 'src/teamglobal/teamglobal.service';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { RuleEnum } from 'src/shared/enums/Rule.enum';

@Injectable()
export class CompetitionglobalService {
  constructor(
    @InjectRepository(CompetitionglobalEntity)
    private readonly competitionglobalRepository: Repository<CompetitionglobalEntity>,
    private readonly ruleService: RuleService,
    private readonly countryService: CountryService,
    private readonly teamglobalService: TeamglobalService,
    private readonly competitionglobalTeamglobalService: CompetitionglobalTeamglobalService,
  ) {}

  async createCompetitionglobal(
    createCompetitionglobalDTO: CreateCompetitionglobalDTO,
  ): Promise<CompetitionglobalEntity> {
    if (createCompetitionglobalDTO.countryId) {
      const rule = await this.ruleService.findRuleById(
        createCompetitionglobalDTO.ruleId,
      );

      const competitionsglobal = await this.findAllCompetitionglobal({
        rule: true,
      });

      const competitionglobalWithRuleIdExists = competitionsglobal.find(
        (competitionglobal) => competitionglobal.rule.id === rule.id,
      );

      if (competitionglobalWithRuleIdExists) {
        throw new BadRequestException(
          `A competitionglobal with ruleId ${rule.id} already exists`,
        );
      }

      if (rule.id === RuleEnum.BrazilianLeagueD) {
        const competitionglobalWithRuleBrazilianLeagueCExists =
          competitionsglobal.find(
            (competitionglobal) =>
              competitionglobal.rule.id === RuleEnum.BrazilianLeagueC,
          );

        if (!competitionglobalWithRuleBrazilianLeagueCExists) {
          throw new BadRequestException(
            `A competitionglobal with ruleId ${RuleEnum.BrazilianLeagueD} must exist before creating a competitionglobal with ruleId ${RuleEnum.BrazilianLeagueC}.`,
          );
        }
      }

      if (rule.id === RuleEnum.BrazilianLeagueC) {
        const competitionglobalWithRuleBrazilianLeagueBExists =
          competitionsglobal.find(
            (competitionglobal) =>
              competitionglobal.rule.id === RuleEnum.BrazilianLeagueB,
          );

        if (!competitionglobalWithRuleBrazilianLeagueBExists) {
          throw new BadRequestException(
            `A competitionglobal with ruleId ${RuleEnum.BrazilianLeagueC} must exist before creating a competitionglobal with ruleId ${RuleEnum.BrazilianLeagueB}.`,
          );
        }
      }

      if (rule.id === RuleEnum.BrazilianLeagueB) {
        const competitionglobalWithRuleBrazilianLeagueAExists =
          competitionsglobal.find(
            (competitionglobal) =>
              competitionglobal.rule.id === RuleEnum.BrazilianLeagueA,
          );

        if (!competitionglobalWithRuleBrazilianLeagueAExists) {
          throw new BadRequestException(
            `A competitionglobal with ruleId ${RuleEnum.BrazilianLeagueB} must exist before creating a competitionglobal with ruleId ${RuleEnum.BrazilianLeagueA}.`,
          );
        }
      }

      if (rule.id === RuleEnum.BrazilianSuperCup) {
        const competitionglobalWithRuleBrazilianLeagueAExists =
          competitionsglobal.find(
            (competitionglobal) =>
              competitionglobal.rule.id === RuleEnum.BrazilianLeagueA,
          );

        const competitionglobalWithRuleBrazilianCupExists =
          competitionsglobal.find(
            (competitionglobal) =>
              competitionglobal.rule.id === RuleEnum.BrazilianCup,
          );

        if (
          !competitionglobalWithRuleBrazilianLeagueAExists ||
          !competitionglobalWithRuleBrazilianCupExists
        ) {
          throw new BadRequestException(
            `Competitions with ruleId ${RuleEnum.BrazilianLeagueA} and ${RuleEnum.BrazilianCup} must exist before creating a competitionglobal with ruleId ${RuleEnum.BrazilianSuperCup}.`,
          );
        }
      }

      const numberOfTeamsRule = rule.numberOfTeams;
      const numberOfTeamsDTO = createCompetitionglobalDTO.teamglobalIds.length;
      if (numberOfTeamsRule !== numberOfTeamsDTO) {
        throw new BadRequestException(
          `According to the rule, there are supposed to be ${numberOfTeamsRule} teamsglobal, but there are ${numberOfTeamsDTO}.`,
        );
      }

      await this.countryService.findCountryById(
        createCompetitionglobalDTO.countryId,
      );

      const ruleId = rule.id;
      const relations = {
        competitionsglobalTeamglobal: {
          competitionglobal: {
            rule: true,
          },
        },
      };

      await Promise.all(
        createCompetitionglobalDTO.teamglobalIds.map(async (teamglobalId) => {
          if (
            [
              RuleEnum.BrazilianLeagueA,
              RuleEnum.BrazilianLeagueB,
              RuleEnum.BrazilianLeagueC,
              RuleEnum.BrazilianLeagueD,
            ].includes(ruleId)
          ) {
            await this.teamglobalService.findTeamglobalById(
              teamglobalId,
              relations,
              true,
            );
          } else if ([RuleEnum.BrazilianCup].includes(ruleId)) {
            await this.teamglobalService.findTeamglobalById(
              teamglobalId,
              relations,
              false,
              true,
            );
          }
        }),
      );

      const competitionglobal = await this.competitionglobalRepository.save(
        createCompetitionglobalDTO,
      );

      await Promise.all(
        createCompetitionglobalDTO.teamglobalIds.map(async (teamglobalId) => {
          await this.competitionglobalTeamglobalService.createCompetitionglobalTeamglobal(
            {
              competitionglobalId: competitionglobal.id,
              teamglobalId: teamglobalId,
            },
          );
        }),
      );

      return competitionglobal;
    }

    throw new BadRequestException('countryId not specified.');
  }

  async findAllCompetitionglobal(
    relations?: RelationsOptionsType,
  ): Promise<CompetitionglobalEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        updatedAt: 'DESC',
        id: 'DESC',
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const competitionsglobal =
      await this.competitionglobalRepository.find(findOptions);

    if (!competitionsglobal) {
      throw new NotFoundException(`Competitionglobal not found.`);
    }

    return competitionsglobal;
  }

  async findCompetitionglobalById(
    competitionglobalId: number,
    relations?: RelationsOptionsType,
  ): Promise<CompetitionglobalEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: competitionglobalId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const competitionglobal =
      await this.competitionglobalRepository.findOne(findOptions);

    if (!competitionglobal) {
      throw new NotFoundException(
        `competitionglobalId: ${competitionglobalId} not found.`,
      );
    }

    return competitionglobal;
  }

  async updateCompetitionglobal(
    updateCompetitionglobalDTO: UpdateCompetitionglobalDTO,
    competitionglobalId: number,
  ): Promise<CompetitionglobalEntity> {
    const competitionglobal = await this.findCompetitionglobalById(
      competitionglobalId,
      { rule: true },
    );

    if ('countryId' in updateCompetitionglobalDTO) {
      delete updateCompetitionglobalDTO.countryId;
    }

    if ('ruleId' in updateCompetitionglobalDTO) {
      delete updateCompetitionglobalDTO.ruleId;
    }

    const numberOfTeamsRule = competitionglobal.rule.numberOfTeams;
    const numberOfTeamsDTO = updateCompetitionglobalDTO.teamglobalIds.length;
    if (numberOfTeamsRule !== numberOfTeamsDTO) {
      throw new BadRequestException(
        `According to the rule, there are supposed to be ${numberOfTeamsRule} teamsglobal, but there are ${numberOfTeamsDTO}.`,
      );
    }

    const ruleId = competitionglobal.rule.id;
    const relations = {
      competitionsglobalTeamglobal: {
        competitionglobal: {
          rule: true,
        },
      },
    };

    await Promise.all(
      updateCompetitionglobalDTO.teamglobalIds.map(async (teamglobalId) => {
        if (
          [
            RuleEnum.BrazilianLeagueA,
            RuleEnum.BrazilianLeagueB,
            RuleEnum.BrazilianLeagueC,
            RuleEnum.BrazilianLeagueD,
          ].includes(ruleId)
        ) {
          const teamglobal = await this.teamglobalService.findTeamglobalById(
            teamglobalId,
            relations,
          );

          const hasCompetitionglobalRuleTypeLeague =
            teamglobal.competitionsglobalTeamglobal?.some(
              (competitionglobalTeamglobal) =>
                [
                  RuleEnum.BrazilianLeagueA,
                  RuleEnum.BrazilianLeagueB,
                  RuleEnum.BrazilianLeagueC,
                  RuleEnum.BrazilianLeagueD,
                ].includes(
                  competitionglobalTeamglobal.competitionglobal?.rule?.id,
                ) &&
                competitionglobalTeamglobal.competitionglobal.id !==
                  competitionglobal.id,
            );

          if (hasCompetitionglobalRuleTypeLeague) {
            throw new BadRequestException(
              `teamglobalId: ${teamglobalId} with competitionglobal with rule competition type league.`,
            );
          }
        } else if ([RuleEnum.BrazilianCup].includes(ruleId)) {
          const teamglobal = await this.teamglobalService.findTeamglobalById(
            teamglobalId,
            relations,
          );

          const hasCompetitionglobalRuleTypeCup =
            teamglobal.competitionsglobalTeamglobal?.some(
              (competitionglobalTeamglobal) =>
                [RuleEnum.BrazilianCup].includes(
                  competitionglobalTeamglobal.competitionglobal?.rule?.id,
                ) &&
                competitionglobalTeamglobal.competitionglobal.id !==
                  competitionglobal.id,
            );

          if (hasCompetitionglobalRuleTypeCup) {
            throw new BadRequestException(
              `teamglobalId: ${teamglobalId} with competitionglobal with rule competition type cup.`,
            );
          }
        }
      }),
    );

    await this.competitionglobalTeamglobalService.deleteCompetitionglobalTeamglobalByCompetitionglobalId(
      competitionglobalId,
    );

    await Promise.all(
      updateCompetitionglobalDTO.teamglobalIds.map(async (teamglobalId) => {
        await this.competitionglobalTeamglobalService.createCompetitionglobalTeamglobal(
          {
            competitionglobalId: competitionglobal.id,
            teamglobalId: teamglobalId,
          },
        );
      }),
    );

    return this.competitionglobalRepository.save({
      ...competitionglobal,
      ...updateCompetitionglobalDTO,
    });
  }

  async deleteCompetitionglobal(
    competitionglobalId: number,
  ): Promise<DeleteResult> {
    const competitionglobal = await this.findCompetitionglobalById(
      competitionglobalId,
      { rule: true },
    );

    const competitionsglobal = await this.findAllCompetitionglobal({
      rule: true,
    });

    if (competitionglobal.rule.id === RuleEnum.BrazilianLeagueA) {
      throw new BadRequestException(
        `A competitionglobal with ruleId ${RuleEnum.BrazilianLeagueA} cannot be deleted.`,
      );
    }

    if (competitionglobal.rule.id === RuleEnum.BrazilianLeagueC) {
      const competitionglobalWithRuleBrazilianLeagueDExists =
        competitionsglobal.find(
          (competitionglobal) =>
            competitionglobal.rule.id === RuleEnum.BrazilianLeagueD,
        );

      if (competitionglobalWithRuleBrazilianLeagueDExists) {
        throw new BadRequestException(
          `To delete a competitionglobal with ruleId ${RuleEnum.BrazilianLeagueC}, it is necessary to first delete the competitionglobal with ruleId ${RuleEnum.BrazilianLeagueD}.`,
        );
      }
    }

    if (competitionglobal.rule.id === RuleEnum.BrazilianLeagueB) {
      const competitionglobalWithRuleBrazilianLeagueCExists =
        competitionsglobal.find(
          (competitionglobal) =>
            competitionglobal.rule.id === RuleEnum.BrazilianLeagueC,
        );

      if (competitionglobalWithRuleBrazilianLeagueCExists) {
        throw new BadRequestException(
          `To delete a competitionglobal with ruleId ${RuleEnum.BrazilianLeagueB}, it is necessary to first delete the competitionglobal with ruleId ${RuleEnum.BrazilianLeagueC}.`,
        );
      }
    }

    if (competitionglobal.rule.id === RuleEnum.BrazilianCup) {
      const competitionglobalWithRuleBrazilianSupercupExists =
        competitionsglobal.find(
          (competitionglobal) =>
            competitionglobal.rule.id === RuleEnum.BrazilianSuperCup,
        );

      if (competitionglobalWithRuleBrazilianSupercupExists) {
        throw new BadRequestException(
          `To delete a competitionglobal with ruleId ${RuleEnum.BrazilianCup}, it is necessary to first delete the competitionglobal with ruleId ${RuleEnum.BrazilianSuperCup}.`,
        );
      }
    }

    await this.competitionglobalTeamglobalService.deleteCompetitionglobalTeamglobalByCompetitionglobalId(
      competitionglobalId,
    );

    return this.competitionglobalRepository.delete({ id: competitionglobalId });
  }
}
