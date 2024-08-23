import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RuleService } from './rule.service';
import { ReturnRuleDTO } from './dtos/returnRule.dto';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';

@Roles(UserUserTypeEnum.Admin, UserUserTypeEnum.User)
@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  async findAllRule(): Promise<ReturnRuleDTO[]> {
    return (await this.ruleService.findAllRule()).map(
      (rule) => new ReturnRuleDTO(rule),
    );
  }
}
