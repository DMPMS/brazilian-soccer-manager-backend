import { Controller, Get, Param, Query } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';
import { CompetitionsaveService } from './competitionsave.service';
import { UserId } from 'src/decorators/userId.decorator';
import { ReturnCompetitionsaveDTO } from './dtos/returnCompetitionsave.dto';

@Roles(UserUserTypeEnum.User)
@Controller('competitionsave')
export class CompetitionsaveController {
  constructor(
    private readonly competitionsaveService: CompetitionsaveService,
  ) {}

  @Get()
  async findAllCompetitionsave(
    @UserId() userId: number,
    @Query('saveId') saveId: number,
  ): Promise<ReturnCompetitionsaveDTO[]> {
    const relations = {
      rule: {
        country: true,
      },
    };

    return (
      await this.competitionsaveService.findAllCompetitionsave(
        userId,
        saveId,
        relations,
      )
    ).map((competitionsave) => new ReturnCompetitionsaveDTO(competitionsave));
  }

  @Get('/:competitionsaveId')
  async findCompetitionsaveById(
    @UserId() userId: number,
    @Query('saveId') saveId: number,
    @Param('competitionsaveId') competitionsaveId,
  ): Promise<ReturnCompetitionsaveDTO> {
    const relations = {
      rule: {
        country: true,
      },
      competitionssaveTeamsave: {
        teamsave: true,
      },
      rounds: {
        matches: {
          teamsaveHome: true,
          teamsaveAway: true,
        },
      },
      rankings: {
        teamsave: true,
      },
    };

    return new ReturnCompetitionsaveDTO(
      await this.competitionsaveService.findCompetitionsaveById(
        userId,
        saveId,
        competitionsaveId,
        relations,
      ),
    );
  }
}
