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

@Injectable()
export class TeamglobalService {
  constructor(
    @InjectRepository(TeamglobalEntity)
    private readonly teamglobalRepository: Repository<TeamglobalEntity>,
    private readonly countryService: CountryService,

    @Inject(forwardRef(() => ManagerglobalService))
    private readonly managerglobalService: ManagerglobalService,
  ) {}

  async createTeamglobal(
    createTeamglobalDTO: CreateTeamglobalDTO,
  ): Promise<TeamglobalEntity> {
    await this.countryService.findCountryById(createTeamglobalDTO.countryId);
    await this.managerglobalService.findManagerglobalById(
      createTeamglobalDTO.managerglobalId,
      undefined,
      true,
    );

    return this.teamglobalRepository.save(createTeamglobalDTO);
  }

  async findAllTeamglobal(
    relations?: RelationsOptions,
  ): Promise<TeamglobalEntity[]> {
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
    const teamglobal = await this.findTeamglobalById(teamglobalId);

    await this.countryService.findCountryById(updateTeamglobalDTO.countryId);

    if (updateTeamglobalDTO.managerglobalId !== teamglobal.managerglobalId) {
      await this.managerglobalService.findManagerglobalById(
        updateTeamglobalDTO.managerglobalId,
        undefined,
        true,
      );
    }

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
