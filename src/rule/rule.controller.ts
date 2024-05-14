import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/userType.enum';
import { RuleService } from './rule.service';
import { ReturnRuleDTO } from './dtos/returnRule.dto';

@Roles(UserType.User, UserType.Admin)
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
