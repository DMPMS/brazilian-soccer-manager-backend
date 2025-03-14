import { Controller, Get, Param, Query } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';
import { MatchService } from './match.service';
import { UserId } from 'src/decorators/userId.decorator';
import { ReturnMatchDTO } from './dtos/returnMatch.dto';

@Roles(UserUserTypeEnum.User)
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('play/:matchId')
  async findPlayMatch(
    @UserId() userId: number,
    @Query('saveId') saveId: number,
    @Param('matchId') matchId: number,
  ): Promise<ReturnMatchDTO> {
    const relations = {
      teamsaveHome: {
        managersave: true,
        playerssave: {
          playerssavePosition: {
            position: true,
          },
        },
        squadplansave: {
          formation: true,
        },
      },
      teamsaveAway: {
        managersave: true,
        playerssave: {
          playerssavePosition: {
            position: true,
          },
        },
        squadplansave: {
          formation: true,
        },
      },
      round: {
        competitionsave: true,
      },
    };

    return new ReturnMatchDTO(
      await this.matchService.findPlayMatch(userId, saveId, matchId, relations),
    );
  }
}
