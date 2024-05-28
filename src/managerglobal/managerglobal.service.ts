import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerglobalEntity } from './entities/managerglobal.entity';
import { DeleteResult, In, Not, Repository } from 'typeorm';
import { CreateManagerglobalDTO } from './dtos/createManagerglobal.dto';
import { CountryService } from 'src/country/country.service';
import { TeamglobalService } from 'src/teamglobal/teamglobal.service';
import { UpdateManagerglobalDTO } from './dtos/updateManagergloba.dto';
import { RelationsOptions } from 'src/types/RelationsOptions.type';

const DEFAULT_WITHOUT_TEAMGLOBAL = false;
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
    relations?: RelationsOptions,
    isWithoutTeamglobal = DEFAULT_WITHOUT_TEAMGLOBAL,
  ): Promise<ManagerglobalEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        createdAt: 'DESC',
      },
    };

    if (isWithoutTeamglobal === true) {
      const managerglobalWithTeamglobalIds =
        await this.findManagerglobalWithTeamglobalIds();

      findOptions = {
        ...findOptions,
        where: {
          id: Not(In(managerglobalWithTeamglobalIds)),
        },
      };
    }

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const managersglobal = await this.managerglobalRepository.find(findOptions);

    if (!managersglobal) {
      throw new NotFoundException(`Managersglobal not found.`);
    }

    return managersglobal;
  }

  async findManagerglobalWithTeamglobalIds(): Promise<number[]> {
    const teamsglobal = await this.teamglobalService.findAllTeamglobal();

    const managerglobalWithTeamglobalIds: number[] = [];

    teamsglobal.forEach((teamglobal) => {
      managerglobalWithTeamglobalIds.push(teamglobal.managerglobalId);
    });

    return managerglobalWithTeamglobalIds;
  }

  async findManagerglobalById(
    managerglobalId: number,
    relations?: RelationsOptions,
    withoutTeamglobal = DEFAULT_WITHOUT_TEAMGLOBAL,
  ): Promise<ManagerglobalEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: managerglobalId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const managerglobal =
      await this.managerglobalRepository.findOne(findOptions);

    if (!managerglobal) {
      throw new NotFoundException(
        `managerglobalId: ${managerglobalId} not found.`,
      );
    }

    if (managerglobal.teamglobal && withoutTeamglobal === true) {
      throw new BadRequestException(
        `managerglobalId: ${managerglobalId} with teamglobal.`,
      );
    }

    return managerglobal;
  }

  async updateManagerglobal(
    updateManagerglobal: UpdateManagerglobalDTO,
    managerglobalId: number,
  ): Promise<ManagerglobalEntity> {
    const managerglobal = await this.findManagerglobalById(managerglobalId);

    await this.countryService.findCountryById(updateManagerglobal.countryId);

    return this.managerglobalRepository.save({
      ...managerglobal,
      ...updateManagerglobal,
    });
  }

  async deleteManagerglobal(managerglobalId: number): Promise<DeleteResult> {
    const relations = {
      teamglobal: true,
    };

    const managerglobal = await this.findManagerglobalById(
      managerglobalId,
      relations,
    );

    if (managerglobal.teamglobal) {
      throw new BadRequestException(
        `managerglobalId: ${managerglobalId} with relations.`,
      );
    }

    return this.managerglobalRepository.delete({ id: managerglobalId });
  }
}
