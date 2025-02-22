import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ManagerglobalEntity } from './entities/managerglobal.entity';
import { DataSource, DeleteResult, In, Repository } from 'typeorm';
import { CreateManagerglobalDTO } from './dtos/createManagerglobal.dto';
import { CountryService } from 'src/country/country.service';
import { TeamglobalService } from 'src/teamglobal/teamglobal.service';
import { UpdateManagerglobalDTO } from './dtos/updateManagerglobal.dto';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { TeamglobalEntity } from 'src/teamglobal/entities/teamglobal.entity';

const DEFAULT_WITHOUT_TEAMGLOBAL = false;
@Injectable()
export class ManagerglobalService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(ManagerglobalEntity)
    private readonly managerglobalRepository: Repository<ManagerglobalEntity>,
    private readonly countryService: CountryService,
    @Inject(forwardRef(() => TeamglobalService))
    private readonly teamglobalService: TeamglobalService,
  ) {}

  async createManagerglobal(
    createManagerglobalDTO: CreateManagerglobalDTO,
  ): Promise<ManagerglobalEntity> {
    await this.countryService.findCountryById(createManagerglobalDTO.countryId);

    return this.managerglobalRepository.save(createManagerglobalDTO);
  }

  async findAllManagerglobal(
    relations?: RelationsOptionsType,
    isWithoutTeamglobal = DEFAULT_WITHOUT_TEAMGLOBAL,
  ): Promise<ManagerglobalEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        updatedAt: 'DESC',
        id: 'DESC',
      },
    };

    if (isWithoutTeamglobal === true) {
      const managerglobalWithoutTeamglobalIds =
        await this.findManagerglobalWithoutTeamglobalIds();

      findOptions = {
        ...findOptions,
        where: {
          id: In(managerglobalWithoutTeamglobalIds),
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

  async findManagerglobalWithoutTeamglobalIds(): Promise<number[]> {
    const managerglobalWithoutTeamglobalIds = await this.dataSource
      .createQueryBuilder()
      .select('managerglobal.id')
      .from(ManagerglobalEntity, 'managerglobal')
      .leftJoin(
        TeamglobalEntity,
        'teamglobal',
        'teamglobal.managerglobal_id = managerglobal.id',
      )
      .where('teamglobal.managerglobal_id IS NULL')
      .getRawMany();

    return managerglobalWithoutTeamglobalIds.map(
      (item) => item.managerglobal_id,
    );
  }

  async findManagerglobalById(
    managerglobalId: number,
    relations?: RelationsOptionsType,
    isWithoutTeamglobal = DEFAULT_WITHOUT_TEAMGLOBAL,
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

    if (managerglobal.teamglobal && isWithoutTeamglobal === true) {
      throw new BadRequestException(
        `managerglobalId: ${managerglobalId} with teamglobal.`,
      );
    }

    return managerglobal;
  }

  async updateManagerglobal(
    updateManagerglobalDTO: UpdateManagerglobalDTO,
    managerglobalId: number,
  ): Promise<ManagerglobalEntity> {
    const managerglobal = await this.findManagerglobalById(managerglobalId);

    await this.countryService.findCountryById(updateManagerglobalDTO.countryId);

    return this.managerglobalRepository.save({
      ...managerglobal,
      ...updateManagerglobalDTO,
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
