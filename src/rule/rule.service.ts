import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuleEntity } from './entities/rule.entity';
import { RuleEnum } from 'src/shared/enums/Rule.enum';

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(RuleEntity)
    private readonly ruleRepository: Repository<RuleEntity>,
  ) {}

  async findAllRule(): Promise<RuleEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        id: 'ASC',
      },
    };

    const rules = await this.ruleRepository.find(findOptions);

    if (!rules) {
      throw new NotFoundException(`Rules not found.`);
    }

    return rules;
  }

  async findRuleById(ruleId: RuleEnum): Promise<RuleEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: ruleId,
      },
    };

    const rule = await this.ruleRepository.findOne(findOptions);

    if (!rule) {
      throw new NotFoundException(`ruleId: ${ruleId} not found.`);
    }

    return rule;
  }
}
