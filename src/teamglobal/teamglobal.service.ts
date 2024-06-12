import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { CreateTeamglobalDTO } from './dtos/createTeamglobal.dto';
import { ManagerglobalService } from 'src/managerglobal/managerglobal.service';
import { UpdateTeamglobalDTO } from './dtos/updateTeamglobal.dto';
import { RelationsOptions } from 'src/types/RelationsOptions.type';
import { PlayerglobalService } from 'src/playerglobal/playerglobal.service';

@Injectable()
export class TeamglobalService {
  constructor(
    @InjectRepository(TeamglobalEntity)
    private readonly teamglobalRepository: Repository<TeamglobalEntity>,
    private readonly countryService: CountryService,

    @Inject(forwardRef(() => ManagerglobalService))
    private readonly managerglobalService: ManagerglobalService,

    @Inject(forwardRef(() => PlayerglobalService))
    private readonly playerglobalService: PlayerglobalService,
  ) {}

  async createTeamglobal(
    createTeamglobalDTO: CreateTeamglobalDTO,
  ): Promise<TeamglobalEntity> {
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
          relations,
          true,
        );
      }),
    );

    const teamglobal =
      await this.teamglobalRepository.save(createTeamglobalDTO);

    // Try to accomplish this before creating the teamglobal.
    await Promise.all(
      createTeamglobalDTO.playerglobalIds.map(async (playerglobalId) => {
        await this.playerglobalService.updatePlayerglobalTeamglobalId(
          teamglobal.id,
          playerglobalId,
        );
      }),
    );

    return teamglobal;
  }

  async findAllTeamglobal(
    relations?: RelationsOptions,
  ): Promise<TeamglobalEntity[]> {
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

    const teamsglobal = await this.teamglobalRepository.find(findOptions);

    if (!teamsglobal) {
      throw new NotFoundException(`Teamsglobal not found.`);
    }

    return teamsglobal;
  }

  async findTeamglobalById(
    teamglobalId: number,
    relations?: RelationsOptions,
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

    return teamglobal;
  }

  async updateTeamglobal(
    updateTeamglobalDTO: UpdateTeamglobalDTO,
    teamglobalId: number,
  ): Promise<TeamglobalEntity> {
    const relationsTeamglobal = { playersglobal: true };
    const teamglobal = await this.findTeamglobalById(
      teamglobalId,
      relationsTeamglobal,
    );

    await this.countryService.findCountryById(updateTeamglobalDTO.countryId);

    if (updateTeamglobalDTO.managerglobalId !== teamglobal.managerglobalId) {
      const relations = { teamglobal: true };
      await this.managerglobalService.findManagerglobalById(
        updateTeamglobalDTO.managerglobalId,
        relations,
        true,
      );
    }

    const teamglobalPlayersglobalIdsInUpdateDTO: number[] = [];

    await Promise.all(
      teamglobal.playersglobal.map(async (playerglobal) => {
        if (!updateTeamglobalDTO.playerglobalIds.includes(playerglobal.id)) {
          await this.playerglobalService.updatePlayerglobalTeamglobalId(
            null,
            playerglobal.id,
          );
        } else {
          teamglobalPlayersglobalIdsInUpdateDTO.push(playerglobal.id);
        }
      }),
    );

    const relations = { teamglobal: true };

    updateTeamglobalDTO.playerglobalIds.map(async (playerglobalId) => {
      if (!teamglobalPlayersglobalIdsInUpdateDTO.includes(playerglobalId)) {
        await this.playerglobalService.findPlayerglobalById(
          playerglobalId,
          relations,
          true,
        );
      }
    });

    await Promise.all(
      updateTeamglobalDTO.playerglobalIds.map(async (playerglobalId) => {
        if (!teamglobalPlayersglobalIdsInUpdateDTO.includes(playerglobalId)) {
          await this.playerglobalService.updatePlayerglobalTeamglobalId(
            teamglobal.id,
            playerglobalId,
          );
        }
      }),
    );

    delete teamglobal.playersglobal;

    return this.teamglobalRepository.save({
      ...teamglobal,
      ...updateTeamglobalDTO,
    });
  }

  async deleteTeamglobal(teamglobalId: number): Promise<DeleteResult> {
    const relations = {
      competitionsglobalTeamglobal: true,
    };

    const teamglobal = await this.findTeamglobalById(teamglobalId, relations);

    if (teamglobal.competitionsglobalTeamglobal.length > 0) {
      throw new BadRequestException(
        `teamglobalId: ${teamglobalId} with relations.`,
      );
    }

    return this.teamglobalRepository.delete({ id: teamglobalId });
  }
}
