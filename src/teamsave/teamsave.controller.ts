import { Controller, Get, Query } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';
import { ReturnTeamsaveDTO } from './dtos/returnTeamsave.dto';
import { TeamsaveService } from './teamsave.service';
import { UserId } from 'src/decorators/userId.decorator';

@Roles(UserUserTypeEnum.User)
@Controller('teamsave')
export class TeamsaveController {
  constructor(private readonly teamsaveService: TeamsaveService) {}

  @Get()
  async findAllTeamsave(
    @UserId() userId: number,
    @Query('saveId') saveId: number,
  ): Promise<ReturnTeamsaveDTO[]> {
    const relations = {
      country: true,
      managersave: true,
    };

    return (
      await this.teamsaveService.findAllTeamsave(userId, saveId, relations)
    ).map((teamsave) => new ReturnTeamsaveDTO(teamsave));
  }
}
