import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { SaveEntity } from './entities/save.entity';
import { CreateSaveDTO } from './dtos/createSave.dto';
import { ManagerglobalService } from 'src/managerglobal/managerglobal.service';
import { ManagersaveEntity } from 'src/managersave/entities/managersave.entity';
import { TeamglobalService } from 'src/teamglobal/teamglobal.service';
import { TeamsaveEntity } from 'src/teamsave/entities/teamsave.entity';
import { PlayerglobalService } from 'src/playerglobal/playerglobal.service';
import { PlayersaveEntity } from 'src/playersave/entities/playersave.entity';
import {
  PLAYERSAVE_STAMINA,
  SAVE_DATETIME,
} from 'src/utils/constants/dtoValidators';
import { PlayerglobalPositionService } from 'src/playerglobal_position/playerglobal_position.service';
import { PlayersavePositionEntity } from 'src/playersave_position/entities/playersave_position.entity';
import { CompetitionglobalService } from 'src/competitionglobal/competitionglobal.service';
import { CompetitionsaveEntity } from 'src/competitionsave/entities/competitionsave.entity';
import { CompetitionglobalTeamglobalService } from 'src/competitionglobal_teamglobal/competitionglobal_teamglobal.service';
import { CompetitionsaveTeamsaveEntity } from 'src/competitionsave_teamsave/entities/competitionsave_teamsave.entity';
import { CountryService } from 'src/country/country.service';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { CompetitionsaveService } from 'src/competitionsave/competitionsave.service';
import { RankingEntity } from 'src/ranking/entities/ranking.entity';
import { MORALE_ENUM_LENGTH } from 'src/shared/enums/Morale.enum';

interface CustomManager {
  countryId: number;
  name: string;
  birthdate: string;
}

@Injectable()
export class SaveService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(SaveEntity)
    private readonly saveRepository: Repository<SaveEntity>,
    private readonly managerglobalService: ManagerglobalService,
    private readonly teamglobalService: TeamglobalService,
    private readonly playerglobalService: PlayerglobalService,
    private readonly playerglobalPositionService: PlayerglobalPositionService,
    private readonly competitionglobalService: CompetitionglobalService,
    private readonly competitionglobalTeamglobalService: CompetitionglobalTeamglobalService,
    private readonly countryService: CountryService,
    private readonly competitionsaveService: CompetitionsaveService,
  ) {}

  async createSave(
    createSaveDTO: CreateSaveDTO,
    userId: number,
  ): Promise<SaveEntity> {
    if (createSaveDTO.isCustomManager === true) {
      if (!createSaveDTO.managerCountryId) {
        throw new BadRequestException('managerCountryId not specified.');
      }

      if (!createSaveDTO.managerName) {
        throw new BadRequestException('managerName not specified.');
      }

      if (!createSaveDTO.managerBirthdate) {
        throw new BadRequestException('managerBirthdate not specified.');
      }
    }

    await this.teamglobalService.findTeamglobalById(createSaveDTO.teamglobalId);

    const save = await this.findUserSaveByName(
      userId,
      createSaveDTO.name,
    ).catch(() => undefined);

    if (save) {
      throw new BadRequestException(
        `Save name ${createSaveDTO.name} already exist for userId: ${userId}.`,
      );
    }

    const saveCreated = await this.saveRepository.save({
      ...createSaveDTO,
      userId: userId,
      controllerManagersaveId: null,
      datetime: SAVE_DATETIME,
    });

    if (createSaveDTO.isCustomManager === true) {
      await this.countryService.findCountryById(createSaveDTO.managerCountryId);

      const customManager: CustomManager = {
        countryId: createSaveDTO.managerCountryId,
        name: createSaveDTO.managerName,
        birthdate: createSaveDTO.managerBirthdate,
      };

      await this.copyGlobalDataToSaveTables(
        saveCreated.id,
        createSaveDTO.teamglobalId,
        customManager,
      );
    } else {
      await this.copyGlobalDataToSaveTables(
        saveCreated.id,
        createSaveDTO.teamglobalId,
      );
    }

    return saveCreated;
  }

  async copyGlobalDataToSaveTables(
    saveId: number,
    saveTeamglobalId: number,
    customManager?: CustomManager,
  ): Promise<void> {
    const managersglobal =
      await this.managerglobalService.findAllManagerglobal();

    const teamsglobal = await this.teamglobalService.findAllTeamglobal();

    const playersglobal = await this.playerglobalService.findAllPlayerglobal();

    const playersglobalPosition =
      await this.playerglobalPositionService.findAllPlayerglobalPosition();

    const competitionsglobal =
      await this.competitionglobalService.findAllCompetitionglobal();

    const competitionsglobalTeamglobal =
      await this.competitionglobalTeamglobalService.findAllCompetitionglobalTeamglobal();

    const globalToSaveManagerIdMap: { [key: number]: number } = {};
    const globalToSaveTeamIdMap: { [key: number]: number } = {};
    const globalToSavePlayerIdMap: { [key: number]: number } = {};
    const globalToSaveCompetitionIdMap: { [key: number]: number } = {};

    const competitionsaveToTeamsaveMap: { [key: number]: number[] } = {};

    const CUSTOM_MANAGER_GLOBAL_ID = 0;
    if (customManager) {
      const managersave = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(ManagersaveEntity)
        .values([
          {
            saveId: saveId,
            managerglobalId: null,
            countryId: customManager.countryId,
            name: customManager.name,
            birthdate: customManager.birthdate,
          },
        ])
        .execute();

      globalToSaveManagerIdMap[CUSTOM_MANAGER_GLOBAL_ID] =
        managersave.identifiers[0].id;
    }

    await Promise.all(
      managersglobal.map(async (managerglobal) => {
        const managersave = await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(ManagersaveEntity)
          .values([
            {
              saveId: saveId,
              managerglobalId: managerglobal.id,
              countryId: managerglobal.countryId,
              name: managerglobal.name,
              birthdate: managerglobal.birthdate,
            },
          ])
          .execute();

        globalToSaveManagerIdMap[managerglobal.id] =
          managersave.identifiers[0].id;
      }),
    );

    await Promise.all(
      teamsglobal.map(async (teamglobal) => {
        const managersaveId =
          teamglobal.id === saveTeamglobalId
            ? customManager
              ? globalToSaveManagerIdMap[CUSTOM_MANAGER_GLOBAL_ID]
              : globalToSaveManagerIdMap[teamglobal.managerglobalId]
            : globalToSaveManagerIdMap[teamglobal.managerglobalId];

        const teamsave = await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(TeamsaveEntity)
          .values([
            {
              saveId: saveId,
              teamglobalId: teamglobal.id,
              countryId: teamglobal.countryId,
              managersaveId: managersaveId,
              name: teamglobal.name,
              srcImage: teamglobal.srcImage,
            },
          ])
          .execute();

        if (teamglobal.id === saveTeamglobalId) {
          await this.dataSource
            .createQueryBuilder()
            .update(SaveEntity)
            .set({ controllerManagersaveId: managersaveId })
            .where('id = :saveId', { saveId })
            .execute();
        }

        globalToSaveTeamIdMap[teamglobal.id] = teamsave.identifiers[0].id;
      }),
    );

    await Promise.all(
      playersglobal.map(async (playerglobal) => {
        const teamsaveId = globalToSaveTeamIdMap[playerglobal.teamglobalId];

        const morale = Math.floor(Math.random() * MORALE_ENUM_LENGTH) + 1;

        const playersave = await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(PlayersaveEntity)
          .values([
            {
              saveId: saveId,
              playerglobalId: playerglobal.id,
              countryId: playerglobal.countryId,
              teamsaveId: teamsaveId,
              name: playerglobal.name,
              birthdate: playerglobal.birthdate,
              overall: playerglobal.overall,
              stamina: PLAYERSAVE_STAMINA,
              morale: morale,
            },
          ])
          .execute();

        globalToSavePlayerIdMap[playerglobal.id] = playersave.identifiers[0].id;
      }),
    );

    await Promise.all(
      playersglobalPosition.map(async (playerglobalPosition) => {
        const playersaveId =
          globalToSavePlayerIdMap[playerglobalPosition.playerglobalId];

        await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(PlayersavePositionEntity)
          .values([
            {
              playersaveId: playersaveId,
              positionId: playerglobalPosition.positionId,
              rating: playerglobalPosition.rating,
            },
          ])
          .execute();
      }),
    );

    await Promise.all(
      competitionsglobal.map(async (competitionglobal) => {
        const competitionsave = await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(CompetitionsaveEntity)
          .values([
            {
              saveId: saveId,
              competitionglobalId: competitionglobal.id,
              ruleId: competitionglobal.ruleId,
              name: competitionglobal.name,
              season: competitionglobal.season,
              srcImage: competitionglobal.srcImage,
            },
          ])
          .execute();

        globalToSaveCompetitionIdMap[competitionglobal.id] =
          competitionsave.identifiers[0].id;
      }),
    );

    await Promise.all(
      competitionsglobalTeamglobal.map(async (competitionglobalTeamglobal) => {
        const competitionsaveId =
          globalToSaveCompetitionIdMap[
            competitionglobalTeamglobal.competitionglobalId
          ];

        const teamsaveId =
          globalToSaveTeamIdMap[competitionglobalTeamglobal.teamglobalId];

        if (!competitionsaveToTeamsaveMap[competitionsaveId]) {
          competitionsaveToTeamsaveMap[competitionsaveId] = [];
        }

        competitionsaveToTeamsaveMap[competitionsaveId].push(teamsaveId);

        await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(CompetitionsaveTeamsaveEntity)
          .values([
            {
              competitionsaveId: competitionsaveId,
              teamsaveId: teamsaveId,
            },
          ])
          .execute();

        await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(RankingEntity)
          .values([
            {
              competitionsaveId: competitionsaveId,
              teamsaveId: teamsaveId,
              points: 0,
              played: 0,
              wins: 0,
              draws: 0,
              losses: 0,
              goalsFor: 0,
              goalsAgainst: 0,
            },
          ])
          .execute();
      }),
    );

    await Promise.all(
      Object.entries(competitionsaveToTeamsaveMap).map(
        async ([competitionsaveId, teamsaveIds]) =>
          this.competitionsaveService.generateCompetitionsaveCalendar(
            Number(competitionsaveId),
            teamsaveIds,
          ),
      ),
    );
  }

  async findSaveByUserId(
    userId: number,
    relations?: RelationsOptionsType,
  ): Promise<SaveEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        userId: userId,
      },
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

    const saves = await this.saveRepository.find(findOptions);

    if (!saves) {
      throw new NotFoundException(`Saves not found for userId: ${userId}.`);
    }

    return saves;
  }

  async findUserSaveByName(userId: number, name: string): Promise<SaveEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        userId: userId,
        name: name,
      },
    };

    const save = await this.saveRepository.findOne(findOptions);

    if (!save) {
      throw new NotFoundException(
        `Save name ${name} not found for userId: ${userId}.`,
      );
    }

    return save;
  }

  async findUserSaveById(
    userId: number,
    saveId: number,
    relations?: RelationsOptionsType,
  ): Promise<SaveEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        userId: userId,
        id: saveId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const save = await this.saveRepository.findOne(findOptions);

    if (!save) {
      throw new NotFoundException(`saveId: ${saveId} not found.`);
    }

    return save;
  }

  async deleteSave(saveId: number, userId: number): Promise<DeleteResult> {
    const save = await this.findUserSaveById(userId, saveId);

    return this.saveRepository.delete({ id: save.id });
  }
}
