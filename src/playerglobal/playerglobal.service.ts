import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerglobalEntity } from './entities/playerglobal.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { CreatePlayerglobalDTO } from './dtos/createPlayerglobal.dto';
import { RelationsOptions } from 'src/types/RelationsOptions.type';
import { UpdatePlayerglobalDTO } from './dtos/updatePlayerglobal.dto';
import { TeamglobalService } from 'src/teamglobal/teamglobal.service';
import { PositionService } from 'src/position/position.service';
import { PlayerglobalPositionService } from 'src/playerglobal_position/playerglobal_position.service';

const PRIMARY_POSITIONS_MAX = 3;
const SECONDARY_POSITIONS_MAX = 5;
const PRIMARY_POSITION_RATING = 1.0;
const SECONDARY_POSITION_RATING = 0.95;

@Injectable()
export class PlayerglobalService {
  constructor(
    @InjectRepository(PlayerglobalEntity)
    private readonly playerglobalRepository: Repository<PlayerglobalEntity>,
    private readonly countryService: CountryService,
    private readonly teamglobalService: TeamglobalService,
    private readonly positionService: PositionService,
    private readonly playerglobalPositionService: PlayerglobalPositionService,
  ) {}

  async createPlayerglobal(
    createPlayerglobalDTO: CreatePlayerglobalDTO,
  ): Promise<PlayerglobalEntity> {
    const numberOfPrimaryPositions =
      createPlayerglobalDTO.primaryPositionIds.length;

    if (numberOfPrimaryPositions > PRIMARY_POSITIONS_MAX) {
      throw new BadRequestException(
        `A playerglobal can have a maximum of ${PRIMARY_POSITIONS_MAX} primary positions, but there are ${numberOfPrimaryPositions}.`,
      );
    }

    const numberOfSecondaryPositions =
      createPlayerglobalDTO.secondaryPositionIds.length;

    if (numberOfSecondaryPositions > SECONDARY_POSITIONS_MAX) {
      throw new BadRequestException(
        `A playerglobal can have a maximum of ${SECONDARY_POSITIONS_MAX} secondary positions, but there are ${numberOfSecondaryPositions}.`,
      );
    }

    await this.countryService.findCountryById(createPlayerglobalDTO.countryId);

    if (
      createPlayerglobalDTO.teamglobalId !== undefined &&
      createPlayerglobalDTO.teamglobalId !== null
    ) {
      await this.teamglobalService.findTeamglobalById(
        createPlayerglobalDTO.teamglobalId,
      );
    }

    const playerglobal = await this.playerglobalRepository.save(
      createPlayerglobalDTO,
    );

    // Try to accomplish this before creating the playerglobal.
    await Promise.all(
      createPlayerglobalDTO.primaryPositionIds.map(async (positionId) => {
        await this.positionService.findPositionById(positionId);
        await this.playerglobalPositionService.createPlayerglobalPosition(
          playerglobal.id,
          positionId,
          PRIMARY_POSITION_RATING,
        );
      }),
    );

    await Promise.all(
      createPlayerglobalDTO.secondaryPositionIds.map(async (positionId) => {
        await this.positionService.findPositionById(positionId);
        await this.playerglobalPositionService.createPlayerglobalPosition(
          playerglobal.id,
          positionId,
          SECONDARY_POSITION_RATING,
        );
      }),
    );

    return playerglobal;
  }

  async findAllPlayerglobal(
    relations?: RelationsOptions,
  ): Promise<PlayerglobalEntity[]> {
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

    const playersglobal = await this.playerglobalRepository.find(findOptions);

    if (!playersglobal) {
      throw new NotFoundException(`Playersglobal not found.`);
    }

    return playersglobal;
  }

  async findPlayerglobalById(
    playerglobalId: number,
    relations?: RelationsOptions,
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

    return playerglobal;
  }

  async updatePlayerglobal(
    updatePlayerglobalDTO: UpdatePlayerglobalDTO,
    playerglobalId: number,
  ): Promise<PlayerglobalEntity> {
    const playerglobal = await this.findPlayerglobalById(playerglobalId);

    const numberOfPrimaryPositions =
      updatePlayerglobalDTO.primaryPositionIds.length;

    if (numberOfPrimaryPositions > PRIMARY_POSITIONS_MAX) {
      throw new BadRequestException(
        `A playerglobal can have a maximum of ${PRIMARY_POSITIONS_MAX} primary positions, but there are ${numberOfPrimaryPositions}.`,
      );
    }

    const numberOfSecondaryPositions =
      updatePlayerglobalDTO.secondaryPositionIds.length;

    if (numberOfSecondaryPositions > SECONDARY_POSITIONS_MAX) {
      throw new BadRequestException(
        `A playerglobal can have a maximum of ${SECONDARY_POSITIONS_MAX} secondary positions, but there are ${numberOfSecondaryPositions}.`,
      );
    }

    await this.countryService.findCountryById(updatePlayerglobalDTO.countryId);

    if (updatePlayerglobalDTO.teamglobalId === undefined) {
      updatePlayerglobalDTO.teamglobalId = null;
    } else if (updatePlayerglobalDTO.teamglobalId !== null) {
      await this.teamglobalService.findTeamglobalById(
        updatePlayerglobalDTO.teamglobalId,
      );
    }

    await this.playerglobalPositionService.deletePlayerglobalPosition(
      playerglobalId,
    );

    await Promise.all(
      updatePlayerglobalDTO.primaryPositionIds.map(async (positionId) => {
        await this.positionService.findPositionById(positionId);
        await this.playerglobalPositionService.createPlayerglobalPosition(
          playerglobal.id,
          positionId,
          PRIMARY_POSITION_RATING,
        );
      }),
    );

    await Promise.all(
      updatePlayerglobalDTO.secondaryPositionIds.map(async (positionId) => {
        await this.positionService.findPositionById(positionId);
        await this.playerglobalPositionService.createPlayerglobalPosition(
          playerglobal.id,
          positionId,
          SECONDARY_POSITION_RATING,
        );
      }),
    );

    return this.playerglobalRepository.save({
      ...playerglobal,
      ...updatePlayerglobalDTO,
    });
  }

  async deletePlayerglobal(playerglobalId: number): Promise<DeleteResult> {
    const relations = {
      teamglobal: true,
    };

    const playerglobal = await this.findPlayerglobalById(
      playerglobalId,
      relations,
    );

    if (playerglobal.teamglobal) {
      throw new BadRequestException(
        `playerglobalId: ${playerglobalId} with relations.`,
      );
    }

    await this.playerglobalPositionService.deletePlayerglobalPosition(
      playerglobalId,
    );

    return this.playerglobalRepository.delete({ id: playerglobalId });
  }
}
