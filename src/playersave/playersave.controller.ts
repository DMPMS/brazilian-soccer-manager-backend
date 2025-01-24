import { Controller, Get, Query } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';
import { ReturnPlayersaveDTO } from './dtos/returnPlayersave.dto';
import { PlayersaveService } from './playersave.service';
import { UserId } from 'src/decorators/userId.decorator';

@Roles(UserUserTypeEnum.User)
@Controller('playersave')
export class PlayersaveController {
  constructor(private readonly playersaveService: PlayersaveService) {}

  @Get()
  async findAllPlayersave(
    @UserId() userId: number,
    @Query('saveId') saveId: number,
  ): Promise<ReturnPlayersaveDTO[]> {
    const relations = {
      country: true,
      teamsave: true,
      playerssavePosition: {
        position: true,
      },
    };

    return (
      await this.playersaveService.findAllPlayersave(userId, saveId, relations)
    ).map((playersave) => new ReturnPlayersaveDTO(playersave));
  }
}
