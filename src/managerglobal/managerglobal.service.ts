import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerglobalEntity } from './entities/managerglobal.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateManagerglobalDTO } from './dtos/createManagerglobal.dto';
import { CountryService } from 'src/country/country.service';
import { TeamglobalService } from 'src/teamglobal/teamglobal.service';
import { UpdateManagerglobalDTO } from './dtos/updateManagergloba.dto';

@Injectable()
export class ManagerglobalService {
  constructor(
    @InjectRepository(ManagerglobalEntity)
    private readonly managerglobalRepository: Repository<ManagerglobalEntity>,
    private readonly countryService: CountryService,
    private readonly teamglobalService: TeamglobalService,
  ) {}

  async createManagerglobal(
    createManagerglobalDTO: CreateManagerglobalDTO,
  ): Promise<ManagerglobalEntity> {
    await this.countryService.findCountryById(createManagerglobalDTO.countryId);

    return this.managerglobalRepository.save(createManagerglobalDTO);
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

    findOptions = {
      ...findOptions,
      order: {
        createdAt: 'DESC',
      },
    };

    const managersglobal = await this.managerglobalRepository.find(findOptions);

    if (!managersglobal) {
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
      order: {
        createdAt: 'DESC',
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
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: managerglobalId,
      },
    };

    const managerglobal =
      await this.managerglobalRepository.findOne(findOptions);

    if (!managerglobal) {
      throw new NotFoundException(
        `managerglobalId: ${managerglobalId} not found.`,
      );
    }

    return managerglobal;
  }

  async updateManagerglobal(
    updateManagerglobal: UpdateManagerglobalDTO,
    managerglobalId: number,
  ): Promise<ManagerglobalEntity> {
    const managerglobal = await this.findManagerglobalById(managerglobalId);

    return this.managerglobalRepository.save({
      ...managerglobal,
      ...updateManagerglobal,
    });
  }
}
