import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { CreateTeamglobalDto } from './dtos/createTeamglobal.dto';
import { ManagerglobalService } from 'src/managerglobal/managerglobal.service';

@Injectable()
export class TeamglobalService {
  constructor(
    @InjectRepository(TeamglobalEntity)
    private readonly teamglobalRepository: Repository<TeamglobalEntity>,
    private readonly countryService: CountryService,
    private readonly managerglobalService: ManagerglobalService,
  ) {}

  async createTeamglobal(
    createTeamglobalDto: CreateTeamglobalDto,
  ): Promise<TeamglobalEntity> {
    await this.countryService.findCountryById(createTeamglobalDto.countryId);
    await this.managerglobalService.findManagerglobalById(
      createTeamglobalDto.managerglobalId,
    );

    return this.teamglobalRepository.save({
      ...createTeamglobalDto,
    });
  }

  async findAllTeamglobal(
    isFindRelations?: boolean,
  ): Promise<TeamglobalEntity[]> {
    let findOptions = {};

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          country: true,
          managerglobal: true,
        },
      };
    }

    const teamsglobal = await this.teamglobalRepository.find(findOptions);

    if (!teamsglobal || teamsglobal.length === 0) {
      throw new NotFoundException(`Teamsglobal not found.`);
    }

    return teamsglobal;
  }
}
