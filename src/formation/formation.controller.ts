import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';
import { FormationService } from './formation.service';
import { ReturnFormationDTO } from './dtos/returnFormation.dto';

@Roles(UserUserTypeEnum.Admin, UserUserTypeEnum.User)
@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Get()
  async findAllFormation(): Promise<ReturnFormationDTO[]> {
    return (await this.formationService.findAllFormation()).map(
      (formation) => new ReturnFormationDTO(formation),
    );
  }
}
