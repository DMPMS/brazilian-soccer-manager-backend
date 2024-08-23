import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { PositionService } from './position.service';
import { ReturnPositionDTO } from './dtos/returnPosition.dto';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';

@Roles(UserUserTypeEnum.Admin, UserUserTypeEnum.User)
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  async findAllPosition(): Promise<ReturnPositionDTO[]> {
    return (await this.positionService.findAllPosition()).map(
      (position) => new ReturnPositionDTO(position),
    );
  }
}
