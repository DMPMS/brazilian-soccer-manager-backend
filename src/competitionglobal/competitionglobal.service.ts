import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetitionglobalEntity } from './entities/competitionglobal.entity';
import { Repository } from 'typeorm';
import { CountryService } from 'src/country/country.service';
import { RuleService } from 'src/rule/rule.service';
import { CreateCompetitionglobalDto } from './dtos/createCompetitionglobal.dto';
import { UpdateCompetitionglobalDto } from './dtos/updateCompetitionglobal.dto';

@Injectable()
export class CompetitionglobalService {
  constructor(
    @InjectRepository(CompetitionglobalEntity)
    private readonly competitionglobalRepository: Repository<CompetitionglobalEntity>,
    private readonly ruleService: RuleService,
    private readonly countryService: CountryService,
  ) {}

  async createCompetitionglobal(
    createCompetitionglobalDto: CreateCompetitionglobalDto,
  ): Promise<CompetitionglobalEntity> {
    if (createCompetitionglobalDto.countryId) {
      await this.ruleService.findRuleById(createCompetitionglobalDto.ruleId);

      await this.countryService.findCountryById(
        createCompetitionglobalDto.countryId,
      );

      return this.competitionglobalRepository.save(createCompetitionglobalDto);
    }

    throw new BadRequestException('countryId not specified.');
  }

  async findAllCompetitionglobal(
    isFindRelations?: boolean,
  ): Promise<CompetitionglobalEntity[]> {
    let findOptions = {};

    if (isFindRelations) {
      findOptions = {
        ...findOptions,
        relations: {
          rule: true,
          country: true,
        },
      };
    }

    findOptions = {
      ...findOptions,
      order: {
        createdAt: 'DESC',
      },
    };

    const competitionsglobal =
      await this.competitionglobalRepository.find(findOptions);

    if (!competitionsglobal) {
      throw new NotFoundException(`Competitionglobal not found.`);
    }

    return competitionsglobal;
  }

  async findCompetitionglobalById(
    competitionglobalId: number,
  ): Promise<CompetitionglobalEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: competitionglobalId,
      },
    };

    const competitionglobal =
      await this.competitionglobalRepository.findOne(findOptions);

    if (!competitionglobal) {
      throw new NotFoundException(
        `competitionglobalId: ${competitionglobalId} not found.`,
      );
    }

    return competitionglobal;
  }

  async updateCompetitionglobal(
    updateCompetitionglobalDto: UpdateCompetitionglobalDto,
    competitionglobalId: number,
  ): Promise<CompetitionglobalEntity> {
    const competitionglobal =
      await this.findCompetitionglobalById(competitionglobalId);

    if ('countryId' in updateCompetitionglobalDto) {
      delete updateCompetitionglobalDto.countryId;
    }

    return this.competitionglobalRepository.save({
      ...competitionglobal,
      ...updateCompetitionglobalDto,
    });
  }
}
