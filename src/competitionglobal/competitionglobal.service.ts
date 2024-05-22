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
import { RelationsOptions } from 'src/types/RelationsOptions.type';

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

      const competitionglobal = await this.competitionglobalRepository.save(
        createCompetitionglobalDTO,
      );

      // Try to accomplish this before creating the competitionglobal.
      await Promise.all(
        createCompetitionglobalDTO.teamglobalIds.map(async (teamglobalId) => {
          await this.teamglobalService.findTeamglobalById(teamglobalId);

          await this.competitionglobalTeamglobalService.createCompetitionglobalTeamglobal(
            competitionglobal.id,
            teamglobalId,
          );
        }),
      );

      return competitionglobal;
    }

    throw new BadRequestException('countryId not specified.');
  }

  async findAllCompetitionglobal(
    relations?: RelationsOptions,
  ): Promise<CompetitionglobalEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        createdAt: 'DESC',
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
    relations?: RelationsOptions,
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
    const competitionglobal =
      await this.findCompetitionglobalById(competitionglobalId);

    if ('countryId' in updateCompetitionglobalDTO) {
      delete updateCompetitionglobalDTO.countryId;
    }

    const rule = await this.ruleService.findRuleById(
      updateCompetitionglobalDTO.ruleId,
    );

    const numberOfTeamsRule = rule.numberOfTeams;
    const numberOfTeamsDTO = updateCompetitionglobalDTO.teamglobalIds.length;
    if (numberOfTeamsRule !== numberOfTeamsDTO) {
      throw new BadRequestException(
        `According to the rule, there are supposed to be ${numberOfTeamsRule} teamsglobal, but there are ${numberOfTeamsDTO}.`,
      );
    }

    await this.competitionglobalTeamglobalService.deleteCompetitionglobalTeamglobal(
      competitionglobalId,
    );

    await Promise.all(
      updateCompetitionglobalDTO.teamglobalIds.map(async (teamglobalId) => {
        await this.teamglobalService.findTeamglobalById(teamglobalId);

        await this.competitionglobalTeamglobalService.createCompetitionglobalTeamglobal(
          competitionglobalId,
          teamglobalId,
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
    await this.findCompetitionglobalById(competitionglobalId);

    await this.competitionglobalTeamglobalService.deleteCompetitionglobalTeamglobal(
      competitionglobalId,
    );

    return this.competitionglobalRepository.delete({ id: competitionglobalId });
  }
}
