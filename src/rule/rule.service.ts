import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuleEntity } from './entities/rule.entity';
import { RuleEnum } from 'src/shared/enums/Rule.enum';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(RuleEntity)
    private readonly ruleRepository: Repository<RuleEntity>,
  ) {}

  async findAllRule(relations?: RelationsOptionsType): Promise<RuleEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        id: 'ASC',
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const rules = await this.ruleRepository.find(findOptions);

    if (!rules) {
      throw new NotFoundException(`Rules not found.`);
    }

    return rules;
  }

  async findRuleById(
    ruleId: RuleEnum,
    relations?: RelationsOptionsType,
  ): Promise<RuleEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: ruleId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const rule = await this.ruleRepository.findOne(findOptions);

    if (!rule) {
      throw new NotFoundException(`ruleId: ${ruleId} not found.`);
    }

    return rule;
  }
}
