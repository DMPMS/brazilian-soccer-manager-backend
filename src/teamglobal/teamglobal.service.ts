import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { CreateTeamglobalDTO } from './dtos/createTeamglobal.dto';
import { ManagerglobalService } from 'src/managerglobal/managerglobal.service';
import { UpdateTeamglobalDTO } from './dtos/updateTeamglobal.dto';

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
    );

    return this.teamglobalRepository.save(createTeamglobalDTO);
  }

  async findAllTeamglobal(
    fields?: string[],
    isFindRelations?: boolean,
  ): Promise<TeamglobalEntity[]> {
    let findOptions = {};

    if (fields) {
      const selectOptions: Record<string, boolean> = {};

      fields.forEach((field) => {
        selectOptions[field] = true;
      });

      findOptions = {
        ...findOptions,
        select: selectOptions,
      };
    }

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          country: true,
          managerglobal: true,
        },
      };
    }

    findOptions = {
      ...findOptions,
      order: {
        createdAt: 'DESC',
      },
    };

    const teamsglobal = await this.teamglobalRepository.find(findOptions);

    if (!teamsglobal) {
      throw new NotFoundException(`Teamsglobal not found.`);
    }

    return teamsglobal;
  }

  async findTeamglobalById(teamglobalId: number): Promise<TeamglobalEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: teamglobalId,
      },
    };

    const teamglobal = await this.teamglobalRepository.findOne(findOptions);

    if (!teamglobal) {
      throw new NotFoundException(`teamglobalId: ${teamglobalId} not found.`);
    }

    return teamglobal;
  }

  async updateTeamglobal(
    updateTeamglobal: UpdateTeamglobalDTO,
    teamglobalId: number,
  ): Promise<TeamglobalEntity> {
    const teamglobal = await this.findTeamglobalById(teamglobalId);

    return this.teamglobalRepository.save({
      ...teamglobal,
      ...updateTeamglobal,
    });
  }
}
