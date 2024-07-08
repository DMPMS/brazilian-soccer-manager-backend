import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerglobalEntity } from './entities/playerglobal.entity';
import { DeleteResult, IsNull, Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { CreatePlayerglobalDTO } from './dtos/createPlayerglobal.dto';
import { RelationsOptions } from 'src/types/RelationsOptions.type';
import { UpdatePlayerglobalDTO } from './dtos/updatePlayerglobal.dto';
import { TeamglobalService } from 'src/teamglobal/teamglobal.service';
import { PositionService } from 'src/position/position.service';
import { PlayerglobalPositionService } from 'src/playerglobal_position/playerglobal_position.service';
import {
  PLAYERGLOBAL_MAX_PRIMARY_POSITIONS,
  PLAYERGLOBAL_MAX_SECONDARY_POSITIONS,
  PLAYERGLOBAL_PRIMARY_POSITION_RATING,
  PLAYERGLOBAL_SECONDARY_POSITION_RATING,
  TEAMGLOBAL_MAX_PLAYERSGLOBAL,
} from 'src/utils/constants/dtoValidators';
import { countPlayerglobalByTeamglobalId } from './dtos/countPlayerglobalByTeamglobalId.dto';

const DEFAULT_WITHOUT_TEAMGLOBAL = false;

@Injectable()
export class PlayerglobalService {
  constructor(
    @InjectRepository(PlayerglobalEntity)
    private readonly playerglobalRepository: Repository<PlayerglobalEntity>,
    private readonly countryService: CountryService,
    @Inject(forwardRef(() => TeamglobalService))
    private readonly teamglobalService: TeamglobalService,
    private readonly positionService: PositionService,
    private readonly playerglobalPositionService: PlayerglobalPositionService,
  ) {}

  async createPlayerglobal(
    createPlayerglobalDTO: CreatePlayerglobalDTO,
  ): Promise<PlayerglobalEntity> {
    const numberOfPrimaryPositions =
      createPlayerglobalDTO.primaryPositionIds.length;

    if (numberOfPrimaryPositions > PLAYERGLOBAL_MAX_PRIMARY_POSITIONS) {
      throw new BadRequestException(
        `A playerglobal can have a maximum of ${PLAYERGLOBAL_MAX_PRIMARY_POSITIONS} primary positions, but there are ${numberOfPrimaryPositions}.`,
      );
    }

    const numberOfSecondaryPositions =
      createPlayerglobalDTO.secondaryPositionIds.length;

    if (numberOfSecondaryPositions > PLAYERGLOBAL_MAX_SECONDARY_POSITIONS) {
      throw new BadRequestException(
        `A playerglobal can have a maximum of ${PLAYERGLOBAL_MAX_SECONDARY_POSITIONS} secondary positions, but there are ${numberOfSecondaryPositions}.`,
      );
    }

    const primaryPositionIdsSet = new Set(
      createPlayerglobalDTO.primaryPositionIds,
    );
    const secondaryPositionIdsSet = new Set(
      createPlayerglobalDTO.secondaryPositionIds,
    );

    const intersection = [...primaryPositionIdsSet].filter((x) =>
      secondaryPositionIdsSet.has(x),
    );

    if (intersection.length > 0) {
      throw new BadRequestException(
        `A playerglobal cannot have the same position as both primary and secondary. Duplicated positionIds: ${intersection.join(', ')}.`,
      );
    }

    await Promise.all(
      createPlayerglobalDTO.primaryPositionIds.map(
        async (primaryPositionId) => {
          await this.positionService.findPositionById(primaryPositionId);
        },
      ),
    );

    await Promise.all(
      createPlayerglobalDTO.secondaryPositionIds.map(
        async (secondaryPositionId) => {
          await this.positionService.findPositionById(secondaryPositionId);
        },
      ),
    );

    await this.countryService.findCountryById(createPlayerglobalDTO.countryId);

    if (createPlayerglobalDTO.teamglobalId) {
      const teamglobal = await this.teamglobalService.findTeamglobalById(
        createPlayerglobalDTO.teamglobalId,
      );

      if (teamglobal.playersglobalCount === TEAMGLOBAL_MAX_PLAYERSGLOBAL) {
        throw new BadRequestException(
          `teamglobalId: ${teamglobal.id} has the maximum number of players.`,
        );
      }
    }

    const playerglobal = await this.playerglobalRepository.save(
      createPlayerglobalDTO,
    );

    await Promise.all(
      createPlayerglobalDTO.primaryPositionIds.map(
        async (primaryPositionId) => {
          await this.playerglobalPositionService.createPlayerglobalPosition(
            playerglobal.id,
            primaryPositionId,
            PLAYERGLOBAL_PRIMARY_POSITION_RATING,
          );
        },
      ),
    );

    await Promise.all(
      createPlayerglobalDTO.secondaryPositionIds.map(
        async (secondaryPositionId) => {
          await this.playerglobalPositionService.createPlayerglobalPosition(
            playerglobal.id,
            secondaryPositionId,
            PLAYERGLOBAL_SECONDARY_POSITION_RATING,
          );
        },
      ),
    );

    return playerglobal;
  }

  async findAllPlayerglobal(
    relations?: RelationsOptions,
    isWithoutTeamglobal = DEFAULT_WITHOUT_TEAMGLOBAL,
  ): Promise<PlayerglobalEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        updatedAt: 'DESC',
        id: 'DESC',
      },
    };

    if (isWithoutTeamglobal === true) {
      findOptions = {
        ...findOptions,
        where: {
          teamglobalId: IsNull(),
        },
      };
    }

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const playersglobal = await this.playerglobalRepository.find(findOptions);

    if (!playersglobal) {
      throw new NotFoundException(`Playersglobal not found.`);
    }

    return playersglobal;
  }

  async findPlayerglobalById(
    playerglobalId: number,
    relations?: RelationsOptions,
    withoutTeamglobal = DEFAULT_WITHOUT_TEAMGLOBAL,
  ): Promise<PlayerglobalEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: playerglobalId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const playerglobal = await this.playerglobalRepository.findOne(findOptions);

    if (!playerglobal) {
      throw new NotFoundException(
        `playerglobalId: ${playerglobalId} not found.`,
      );
    }

    if (playerglobal.teamglobalId && withoutTeamglobal === true) {
      throw new BadRequestException(
        `playerglobalId: ${playerglobalId} with teamglobal.`,
      );
    }

    return playerglobal;
  }

  async updatePlayerglobal(
    updatePlayerglobalDTO: UpdatePlayerglobalDTO,
    playerglobalId: number,
  ): Promise<PlayerglobalEntity> {
    const playerglobal = await this.findPlayerglobalById(playerglobalId);

    const numberOfPrimaryPositions =
      updatePlayerglobalDTO.primaryPositionIds.length;

    if (numberOfPrimaryPositions > PLAYERGLOBAL_MAX_PRIMARY_POSITIONS) {
      throw new BadRequestException(
        `A playerglobal can have a maximum of ${PLAYERGLOBAL_MAX_PRIMARY_POSITIONS} primary positions, but there are ${numberOfPrimaryPositions}.`,
      );
    }

    const numberOfSecondaryPositions =
      updatePlayerglobalDTO.secondaryPositionIds.length;

    if (numberOfSecondaryPositions > PLAYERGLOBAL_MAX_SECONDARY_POSITIONS) {
      throw new BadRequestException(
        `A playerglobal can have a maximum of ${PLAYERGLOBAL_MAX_SECONDARY_POSITIONS} secondary positions, but there are ${numberOfSecondaryPositions}.`,
      );
    }

    const primaryPositionIdsSet = new Set(
      updatePlayerglobalDTO.primaryPositionIds,
    );
    const secondaryPositionIdsSet = new Set(
      updatePlayerglobalDTO.secondaryPositionIds,
    );

    const intersection = [...primaryPositionIdsSet].filter((x) =>
      secondaryPositionIdsSet.has(x),
    );

    if (intersection.length > 0) {
      throw new BadRequestException(
        `A playerglobal cannot have the same position as both primary and secondary. Duplicated positionIds: ${intersection.join(', ')}.`,
      );
    }

    await Promise.all(
      updatePlayerglobalDTO.primaryPositionIds.map(async (positionId) => {
        await this.positionService.findPositionById(positionId);
      }),
    );

    await Promise.all(
      updatePlayerglobalDTO.secondaryPositionIds.map(async (positionId) => {
        await this.positionService.findPositionById(positionId);
      }),
    );

    await this.countryService.findCountryById(updatePlayerglobalDTO.countryId);

    if (updatePlayerglobalDTO.teamglobalId) {
      if (updatePlayerglobalDTO.teamglobalId != playerglobal.teamglobalId) {
        const teamglobal = await this.teamglobalService.findTeamglobalById(
          updatePlayerglobalDTO.teamglobalId,
        );

        if (teamglobal.playersglobalCount === TEAMGLOBAL_MAX_PLAYERSGLOBAL) {
          throw new BadRequestException(
            `teamglobalId: ${teamglobal.id} has the maximum number of players.`,
          );
        }
      }
    } else {
      updatePlayerglobalDTO.teamglobalId = null;
    }

    await this.playerglobalPositionService.deletePlayerglobalPositionByPlayerglobalId(
      playerglobalId,
    );

    await Promise.all(
      updatePlayerglobalDTO.primaryPositionIds.map(async (positionId) => {
        await this.playerglobalPositionService.createPlayerglobalPosition(
          playerglobal.id,
          positionId,
          PLAYERGLOBAL_PRIMARY_POSITION_RATING,
        );
      }),
    );

    await Promise.all(
      updatePlayerglobalDTO.secondaryPositionIds.map(async (positionId) => {
        await this.playerglobalPositionService.createPlayerglobalPosition(
          playerglobal.id,
          positionId,
          PLAYERGLOBAL_SECONDARY_POSITION_RATING,
        );
      }),
    );

    return this.playerglobalRepository.save({
      ...playerglobal,
      ...updatePlayerglobalDTO,
    });
  }

  async deletePlayerglobal(playerglobalId: number): Promise<DeleteResult> {
    const playerglobal = await this.findPlayerglobalById(playerglobalId);

    if (playerglobal.teamglobalId) {
      throw new BadRequestException(
        `playerglobalId: ${playerglobalId} with relations.`,
      );
    }

    await this.playerglobalPositionService.deletePlayerglobalPositionByPlayerglobalId(
      playerglobalId,
    );

    return this.playerglobalRepository.delete({ id: playerglobalId });
  }

  async updatePlayerglobalTeamglobalId(
    teamglobalId: number | null,
    playerglobalId: number,
  ): Promise<PlayerglobalEntity> {
    const playerglobal = await this.findPlayerglobalById(playerglobalId);

    return this.playerglobalRepository.save({
      ...playerglobal,
      teamglobalId: teamglobalId,
    });
  }

  async updatePlayersglobalAfterUpdateTeamglobal(
    playerglobalIds: number[],
    teamglobalId: number,
  ): Promise<void> {
    await this.playerglobalRepository
      .createQueryBuilder()
      .update(PlayerglobalEntity)
      .set({ teamglobalId: null })
      .where('teamglobal_id = :teamglobalId', { teamglobalId })
      .andWhere('id NOT IN (:...playerglobalIds)', { playerglobalIds })
      .execute();

    await this.playerglobalRepository
      .createQueryBuilder()
      .update(PlayerglobalEntity)
      .set({ teamglobalId: teamglobalId })
      .where('id IN (:...playerglobalIds)', { playerglobalIds })
      .execute();
  }

  async countPlayerglobalByTeamglobalId(): Promise<
    countPlayerglobalByTeamglobalId[]
  > {
    return await this.playerglobalRepository
      .createQueryBuilder('playerglobal')
      .select('playerglobal.teamglobal_id')
      .addSelect('COUNT(*)', 'total')
      .where('teamglobal_id IS NOT NULL')
      .groupBy('playerglobal.teamglobal_id')
      .getRawMany();
  }
}
