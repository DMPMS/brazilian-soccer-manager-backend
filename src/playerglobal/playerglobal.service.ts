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

@Injectable()
export class PlayerglobalService {
  constructor(
    @InjectRepository(PlayerglobalEntity)
    private readonly playerglobalRepository: Repository<PlayerglobalEntity>,
    private readonly countryService: CountryService,
    private readonly teamglobalService: TeamglobalService,
  ) {}

  async createPlayerglobal(
    createPlayerglobalDTO: CreatePlayerglobalDTO,
  ): Promise<PlayerglobalEntity> {
    await this.countryService.findCountryById(createPlayerglobalDTO.countryId);

    if (
      createPlayerglobalDTO.teamglobalId !== undefined &&
      createPlayerglobalDTO.teamglobalId !== null
    ) {
      await this.teamglobalService.findTeamglobalById(
        createPlayerglobalDTO.teamglobalId,
      );
    }

    return this.playerglobalRepository.save(createPlayerglobalDTO);
  }

  async findAllPlayerglobal(
    relations?: RelationsOptions,
  ): Promise<PlayerglobalEntity[]> {
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

    await this.countryService.findCountryById(updatePlayerglobalDTO.countryId);

    if (updatePlayerglobalDTO.teamglobalId === undefined) {
      updatePlayerglobalDTO.teamglobalId = null;
    } else if (updatePlayerglobalDTO.teamglobalId !== null) {
      await this.teamglobalService.findTeamglobalById(
        updatePlayerglobalDTO.teamglobalId,
      );
    }

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

    return this.playerglobalRepository.delete({ id: playerglobalId });
  }
}
