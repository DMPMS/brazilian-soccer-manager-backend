import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerglobalEntity } from './entities/managerglobal.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateManagerglobalDto } from './dtos/createManagerglobal.dto';
import { CountryService } from 'src/country/country.service';
import { TeamglobalService } from 'src/teamglobal/teamglobal.service';

@Injectable()
export class ManagerglobalService {
  constructor(
    @InjectRepository(ManagerglobalEntity)
    private readonly managerglobalRepository: Repository<ManagerglobalEntity>,
    private readonly countryService: CountryService,
    private readonly teamglobalService: TeamglobalService,
  ) {}

  async createManagerglobal(
    createManagerglobalDto: CreateManagerglobalDto,
  ): Promise<ManagerglobalEntity> {
    await this.countryService.findCountryById(createManagerglobalDto.countryId);

    return this.managerglobalRepository.save({
      ...createManagerglobalDto,
    });
  }

  async findAllManagerglobal(
    isFindRelations?: boolean,
  ): Promise<ManagerglobalEntity[]> {
    let findOptions = {};

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          country: true,
          teamglobal: true,
        },
      };
    }

    const managersglobal = await this.managerglobalRepository.find(findOptions);

    if (!managersglobal || managersglobal.length === 0) {
      throw new NotFoundException(`Managersglobal not found.`);
    }

    return managersglobal;
  }

  async findAllManagerglobalWithoutTeamglobal(
    isFindRelations?: boolean,
  ): Promise<ManagerglobalEntity[]> {
    const teamsglobal = await this.teamglobalService.findAllTeamglobal([
      'managerglobalId',
    ]);

    const managersglobalIds: number[] = [];

    teamsglobal.forEach((teamglobal) => {
      if (teamglobal.managerglobalId) {
        managersglobalIds.push(teamglobal.managerglobalId);
      }
    });

    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: Not(In(managersglobalIds)),
      },
    };

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          country: true,
          teamglobal: true,
        },
      };
    }

    const managersglobal = await this.managerglobalRepository.find(findOptions);

    if (!managersglobal) {
      throw new NotFoundException(`Managersglobal not found.`);
    }

    return managersglobal;
  }

  async findManagerglobalById(
    managerglobalId: number,
  ): Promise<ManagerglobalEntity> {
    const managerglobal = await this.managerglobalRepository.findOne({
      where: {
        id: managerglobalId,
      },
    });

    if (!managerglobal) {
      throw new NotFoundException(
        `managerglobalId: ${managerglobalId} not found.`,
      );
    }

    return managerglobal;
  }
}
