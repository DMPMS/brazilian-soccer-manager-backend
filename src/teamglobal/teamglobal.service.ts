import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, In, Not, Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { CreateTeamglobalDTO } from './dtos/createTeamglobal.dto';
import { ManagerglobalService } from 'src/managerglobal/managerglobal.service';
import { UpdateTeamglobalDTO } from './dtos/updateTeamglobal.dto';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { PlayerglobalService } from 'src/playerglobal/playerglobal.service';
import { countPlayerglobalByTeamglobalId } from 'src/playerglobal/dtos/countPlayerglobalByTeamglobalId.dto';
import { CompetitionglobalTeamglobalEntity } from 'src/competitionglobal_teamglobal/entities/competitionglobal_teamglobal.entity';
import { CompetitionglobalEntity } from 'src/competitionglobal/entities/competitionglobal.entity';
import { RuleEnum } from 'src/shared/enums/Rule.enum';
import { SquadplanglobalService } from 'src/squadplanglobal/squadplanglobal.service';

const DEFAULT_WITHOUT_COMPETITIONGLOBAL_RULETYPE_LEAGUE = false;
const DEFAULT_WITHOUT_COMPETITIONGLOBAL_RULETYPE_CUP = false;

@Injectable()
export class TeamglobalService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectRepository(TeamglobalEntity)
    private readonly teamglobalRepository: Repository<TeamglobalEntity>,
    private readonly countryService: CountryService,

    @Inject(forwardRef(() => ManagerglobalService))
    private readonly managerglobalService: ManagerglobalService,
    private readonly playerglobalService: PlayerglobalService,
    private readonly squadplanglobalService: SquadplanglobalService,
  ) {}

  async createTeamglobal(
    createTeamglobalDTO: CreateTeamglobalDTO,
  ): Promise<TeamglobalEntity> {
    const allSquadplanglobalPlayerglobalIdsIncludedInPlayerglobalIds =
      createTeamglobalDTO.squadplanglobalPlayerglobalIds.every(
        (squadplanglobalPlayerglobalId) =>
          createTeamglobalDTO.playerglobalIds.includes(
            squadplanglobalPlayerglobalId,
          ),
      );

    if (!allSquadplanglobalPlayerglobalIdsIncludedInPlayerglobalIds) {
      throw new BadRequestException(
        'All squadplanglobalPlayerglobalIds must be included in the playerglobalIds list.',
      );
    }

    await this.countryService.findCountryById(createTeamglobalDTO.countryId);

    const relations = { teamglobal: true };

    await this.managerglobalService.findManagerglobalById(
      createTeamglobalDTO.managerglobalId,
      relations,
      true,
    );

    await Promise.all(
      createTeamglobalDTO.playerglobalIds.map(async (playerglobalId) => {
        await this.playerglobalService.findPlayerglobalById(
          playerglobalId,
          undefined,
          true,
        );
      }),
    );

    const teamglobal =
      await this.teamglobalRepository.save(createTeamglobalDTO);

    await Promise.all(
      createTeamglobalDTO.playerglobalIds.map(async (playerglobalId) => {
        await this.playerglobalService.updatePlayerglobalTeamglobalId(
          teamglobal.id,
          playerglobalId,
        );
      }),
    );

    await this.squadplanglobalService.createSquadplanglobal({
      teamglobalId: teamglobal.id,
      formationId: createTeamglobalDTO.squadplanglobalFormationId,
      playerglobalIds: createTeamglobalDTO.squadplanglobalPlayerglobalIds,
    });

    return teamglobal;
  }

  async findAllTeamglobal(
    relations?: RelationsOptionsType,
    isWithoutCompetitionglobalRuleTypeLeague = DEFAULT_WITHOUT_COMPETITIONGLOBAL_RULETYPE_LEAGUE,
    isWithoutCompetitionglobalRuleTypeCup = DEFAULT_WITHOUT_COMPETITIONGLOBAL_RULETYPE_CUP,
  ): Promise<TeamglobalEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        updatedAt: 'DESC',
        id: 'DESC',
      },
    };

    if (isWithoutCompetitionglobalRuleTypeLeague === true) {
      const teamglobalWithCompetitionglobalRuleTypeLeague =
        await this.findTeamglobalWithCompetitionglobalRuleId([
          RuleEnum.BrazilianLeagueA,
          RuleEnum.BrazilianLeagueB,
          RuleEnum.BrazilianLeagueC,
          RuleEnum.BrazilianLeagueD,
        ]);

      findOptions = {
        ...findOptions,
        where: {
          id: Not(In(teamglobalWithCompetitionglobalRuleTypeLeague)),
        },
      };
    } else if (isWithoutCompetitionglobalRuleTypeCup === true) {
      const teamglobalWithCompetitionglobalRuleTypeCup =
        await this.findTeamglobalWithCompetitionglobalRuleId([
          RuleEnum.BrazilianCup,
        ]);

      findOptions = {
        ...findOptions,
        where: {
          id: Not(In(teamglobalWithCompetitionglobalRuleTypeCup)),
        },
      };
    }

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const teamsglobal = await this.teamglobalRepository.find(findOptions);

    if (!teamsglobal) {
      throw new NotFoundException(`Teamsglobal not found.`);
    }

    const countPlayersglobalList =
      await this.playerglobalService.countPlayerglobalByTeamglobalId();

    return teamsglobal.map((teamglobal) => {
      return {
        ...teamglobal,
        playersglobalCount: Number(
          this.countPlayersglobalInTeamglobal(
            teamglobal.id,
            countPlayersglobalList,
          ),
        ),
      };
    });
  }

  async findTeamglobalWithCompetitionglobalRuleId(
    RuleIds: RuleEnum[],
  ): Promise<number[]> {
    const teamglobalWithCompetitionglobalRuleTypeLeagueIds =
      await this.dataSource
        .createQueryBuilder()
        .select('DISTINCT teamglobal.id')
        .from(TeamglobalEntity, 'teamglobal')
        .innerJoin(
          CompetitionglobalTeamglobalEntity,
          'competitionglobal_teamglobal',
          'competitionglobal_teamglobal.teamglobal_id = teamglobal.id',
        )
        .innerJoin(
          CompetitionglobalEntity,
          'competitionglobal',
          'competitionglobal_teamglobal.competitionglobal_id = competitionglobal.id AND competitionglobal.rule_id IN (:...ruleIds)',
          {
            ruleIds: RuleIds,
          },
        )
        .getRawMany()
        .then((results) => results.map((result) => result.id));

    return teamglobalWithCompetitionglobalRuleTypeLeagueIds;
  }

  async findTeamglobalById(
    teamglobalId: number,
    relations?: RelationsOptionsType,
    isWithoutCompetitionglobalRuleTypeLeague = DEFAULT_WITHOUT_COMPETITIONGLOBAL_RULETYPE_LEAGUE,
    isWithoutCompetitionglobalRuleTypeCup = DEFAULT_WITHOUT_COMPETITIONGLOBAL_RULETYPE_CUP,
  ): Promise<TeamglobalEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: teamglobalId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const teamglobal = await this.teamglobalRepository.findOne(findOptions);

    if (!teamglobal) {
      throw new NotFoundException(`teamglobalId: ${teamglobalId} not found.`);
    }

    if (isWithoutCompetitionglobalRuleTypeLeague) {
      const hasCompetitionglobalRuleTypeLeague =
        teamglobal.competitionsglobalTeamglobal?.some(
          (competitionglobalTeamglobal) =>
            [
              RuleEnum.BrazilianLeagueA,
              RuleEnum.BrazilianLeagueB,
              RuleEnum.BrazilianLeagueC,
              RuleEnum.BrazilianLeagueD,
            ].includes(competitionglobalTeamglobal.competitionglobal?.rule?.id),
        );

      if (hasCompetitionglobalRuleTypeLeague) {
        throw new BadRequestException(
          `teamglobalId: ${teamglobalId} with competitionglobal with rule competition type league.`,
        );
      }
    } else if (isWithoutCompetitionglobalRuleTypeCup) {
      const hasCompetitionglobalRuleTypeCup =
        teamglobal.competitionsglobalTeamglobal?.some(
          (competitionglobalTeamglobal) =>
            [RuleEnum.BrazilianCup].includes(
              competitionglobalTeamglobal.competitionglobal?.rule?.id,
            ),
        );

      if (hasCompetitionglobalRuleTypeCup) {
        throw new BadRequestException(
          `teamglobalId: ${teamglobalId} with competitionglobal with rule competition type cup.`,
        );
      }
    }

    const countPlayersglobalList =
      await this.playerglobalService.countPlayerglobalByTeamglobalId();

    return {
      ...teamglobal,
      playersglobalCount: Number(
        this.countPlayersglobalInTeamglobal(
          Number(teamglobalId),
          countPlayersglobalList,
        ),
      ),
    };
  }

  async updateTeamglobal(
    updateTeamglobalDTO: UpdateTeamglobalDTO,
    teamglobalId: number,
  ): Promise<TeamglobalEntity> {
    const relations = { squadplanglobal: true };
    const teamglobal = await this.findTeamglobalById(teamglobalId, relations);

    const allSquadplanglobalPlayerglobalIdsIncludedInPlayerglobalIds =
      updateTeamglobalDTO.squadplanglobalPlayerglobalIds.every(
        (squadplanglobalPlayerglobalId) =>
          updateTeamglobalDTO.playerglobalIds.includes(
            squadplanglobalPlayerglobalId,
          ),
      );

    if (!allSquadplanglobalPlayerglobalIdsIncludedInPlayerglobalIds) {
      throw new BadRequestException(
        'All squadplanglobalPlayerglobalIds must be included in the playerglobalIds list.',
      );
    }

    await this.countryService.findCountryById(updateTeamglobalDTO.countryId);

    if (updateTeamglobalDTO.managerglobalId !== teamglobal.managerglobalId) {
      await this.managerglobalService.findManagerglobalById(
        updateTeamglobalDTO.managerglobalId,
        { teamglobal: true },
        true,
      );
    }

    await Promise.all(
      updateTeamglobalDTO.playerglobalIds.map(async (playerglobalId) => {
        const playerglobal =
          await this.playerglobalService.findPlayerglobalById(playerglobalId);

        if (
          playerglobal.teamglobalId &&
          playerglobal.teamglobalId !== Number(teamglobalId)
        ) {
          throw new BadRequestException(
            `playerglobalId: ${playerglobalId} with teamglobal.`,
          );
        }
      }),
    );

    await this.playerglobalService.updatePlayersglobalAfterUpdateTeamglobal(
      updateTeamglobalDTO.playerglobalIds,
      teamglobalId,
    );

    await this.squadplanglobalService.updateSquadplanglobal(
      teamglobal.squadplanglobal.id,
      {
        teamglobalId: teamglobal.id,
        formationId: updateTeamglobalDTO.squadplanglobalFormationId,
        playerglobalIds: updateTeamglobalDTO.squadplanglobalPlayerglobalIds,
      },
    );

    return this.teamglobalRepository.save({
      ...teamglobal,
      ...updateTeamglobalDTO,
    });
  }

  async deleteTeamglobal(teamglobalId: number): Promise<DeleteResult> {
    const relations = {
      competitionsglobalTeamglobal: true,
      playersglobal: true,
    };

    const teamglobal = await this.findTeamglobalById(teamglobalId, relations);

    if (teamglobal.competitionsglobalTeamglobal.length > 0) {
      throw new BadRequestException(
        `teamglobalId: ${teamglobalId} with relations.`,
      );
    }

    await Promise.all(
      teamglobal.playersglobal.map(async (playerglobal) => {
        await this.playerglobalService.updatePlayerglobalTeamglobalId(
          null,
          playerglobal.id,
        );
      }),
    );

    await this.squadplanglobalService.deleteSquaplanglobalByTeamglobalId(
      teamglobalId,
    );

    return this.teamglobalRepository.delete({ id: teamglobalId });
  }

  countPlayersglobalInTeamglobal(
    teamglobalId: number,
    countPlayersglobalList: countPlayerglobalByTeamglobalId[],
  ): number {
    const count = countPlayersglobalList.find(
      (item) => item.teamglobal_id === teamglobalId,
    );

    if (count) {
      return count.total;
    }

    return 0;
  }
}
