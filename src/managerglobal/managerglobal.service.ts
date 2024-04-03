import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerGlobalEntity } from './entities/managerglobal.entity';
import { Repository } from 'typeorm';
import { CreateManagerGlobalDto } from './dtos/createManagerGlobal.dto';
import { CountryService } from 'src/country/country.service';

@Injectable()
export class ManagerglobalService {
  constructor(
    @InjectRepository(ManagerGlobalEntity)
    private readonly managerGlobalRepository: Repository<ManagerGlobalEntity>,
    private readonly countryService: CountryService,
  ) {}

  async createManagerGlobal(
    createManagerGlobalDto: CreateManagerGlobalDto,
  ): Promise<ManagerGlobalEntity> {
    await this.countryService.findCountryById(createManagerGlobalDto.countryId);

    return this.managerGlobalRepository.save({
      ...createManagerGlobalDto,
    });
  }

  async findAllManagerGlobal(
    isFindRelations?: boolean,
  ): Promise<ManagerGlobalEntity[]> {
    let findOptions = {};

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          country: true,
        },
      };
    }

    const managersGlobal = await this.managerGlobalRepository.find(findOptions);

    if (!managersGlobal || managersGlobal.length === 0) {
      throw new NotFoundException(`ManagersGlobal not found.`);
    }

    return managersGlobal;
  }
}
