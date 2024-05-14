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
import { CreateCompetitionglobalDTO } from './dtos/createCompetitionglobal.dto';
import { UpdateCompetitionglobalDTO } from './dtos/updateCompetitionglobal.dto';

@Injectable()
export class CompetitionglobalService {
  constructor(
    @InjectRepository(CompetitionglobalEntity)
    private readonly competitionglobalRepository: Repository<CompetitionglobalEntity>,
    private readonly ruleService: RuleService,
    private readonly countryService: CountryService,
  ) {}

  async createCompetitionglobal(
    createCompetitionglobalDTO: CreateCompetitionglobalDTO,
  ): Promise<CompetitionglobalEntity> {
    if (createCompetitionglobalDTO.countryId) {
      await this.ruleService.findRuleById(createCompetitionglobalDTO.ruleId);

      await this.countryService.findCountryById(
        createCompetitionglobalDTO.countryId,
      );

      return this.competitionglobalRepository.save(createCompetitionglobalDTO);
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
    updateCompetitionglobalDTO: UpdateCompetitionglobalDTO,
    competitionglobalId: number,
  ): Promise<CompetitionglobalEntity> {
    const competitionglobal =
      await this.findCompetitionglobalById(competitionglobalId);

    if ('countryId' in updateCompetitionglobalDTO) {
      delete updateCompetitionglobalDTO.countryId;
    }

    return this.competitionglobalRepository.save({
      ...competitionglobal,
      ...updateCompetitionglobalDTO,
    });
  }
}
