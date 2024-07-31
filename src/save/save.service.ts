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
import { PLAYERSAVE_STAMINA } from 'src/utils/constants/dtoValidators';
import { PlayerglobalPositionService } from 'src/playerglobal_position/playerglobal_position.service';
import { PlayersavePositionEntity } from 'src/playersave_position/entities/playersave_position.entity';
import { CompetitionglobalService } from 'src/competitionglobal/competitionglobal.service';
import { CompetitionsaveEntity } from 'src/competitionsave/entities/competitionsave.entity';

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
  ) {}

  async createSave(
    createSaveDTO: CreateSaveDTO,
    userId: number,
  ): Promise<SaveEntity> {
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
      userId,
    });

    await this.copyGlobalDataToSaveTables(saveCreated.id);

    return saveCreated;
  }

  async copyGlobalDataToSaveTables(saveId: number): Promise<void> {
    const managersglobal =
      await this.managerglobalService.findAllManagerglobal();

    const teamsglobal = await this.teamglobalService.findAllTeamglobal();

    const playersglobal = await this.playerglobalService.findAllPlayerglobal();

    const playersglobalPosition =
      await this.playerglobalPositionService.findAllPlayerglobalPosition();

    const competitionsglobal =
      await this.competitionglobalService.findAllCompetitionglobal();

    const globalToSaveManagerIdMap: { [key: number]: number } = {};
    const globalToSaveTeamIdMap: { [key: number]: number } = {};
    const globalToSavePlayerIdMap: { [key: number]: number } = {};

    for (const managerglobal of managersglobal) {
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
            controlled: false,
          },
        ])
        .execute();

      globalToSaveManagerIdMap[managerglobal.id] =
        managersave.identifiers[0].id;
    }

    for (const teamglobal of teamsglobal) {
      const managersaveId =
        globalToSaveManagerIdMap[teamglobal.managerglobalId];

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

      globalToSaveTeamIdMap[teamglobal.id] = teamsave.identifiers[0].id;
    }

    for (const playerglobal of playersglobal) {
      const teamsaveId = globalToSaveTeamIdMap[playerglobal.teamglobalId];

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
          },
        ])
        .execute();

      globalToSavePlayerIdMap[playerglobal.id] = playersave.identifiers[0].id;
    }

    for (const playerglobalPosition of playersglobalPosition) {
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
    }

    for (const competitionglobal of competitionsglobal) {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(CompetitionsaveEntity)
        .values([
          {
            saveId: saveId,
            competitionglobalId: competitionglobal.id,
            ruleId: competitionglobal.ruleId,
            countryId: competitionglobal.countryId,
            name: competitionglobal.name,
            season: competitionglobal.season,
            srcImage: competitionglobal.srcImage,
          },
        ])
        .execute();
    }
  }

  async findSaveByUserId(userId: number): Promise<SaveEntity[]> {
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

  async findSaveById(saveId: number): Promise<SaveEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: saveId,
      },
    };

    const save = await this.saveRepository.findOne(findOptions);

    if (!save) {
      throw new NotFoundException(`saveId: ${saveId} not found.`);
    }

    return save;
  }

  async deleteSave(saveId: number, userId: number): Promise<DeleteResult> {
    const save = await this.findSaveById(saveId);

    if (save.userId !== userId) {
      // Better not to say that the save does not belong to the user.
      throw new NotFoundException(`saveId: ${saveId} not found.`);
    }

    return this.saveRepository.delete({ id: save.id });
  }
}
