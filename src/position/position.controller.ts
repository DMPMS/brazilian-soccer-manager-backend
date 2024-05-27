import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/userType.enum';
import { PositionService } from './position.service';
import { ReturnPositionDTO } from './dtos/returnPosition.dto';

@Roles(UserType.Admin, UserType.User)
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
