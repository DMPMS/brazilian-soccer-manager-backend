import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { TeamglobalService } from './teamglobal.service';
import { CreateTeamglobalDTO } from './dtos/createTeamglobal.dto';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { ReturnTeamglobalDTO } from './dtos/returnTeamglobal.dto';
import { UpdateTeamglobalDTO } from './dtos/updateTeamglobal.dto';
import { DeleteResult } from 'typeorm';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';

@Controller('teamglobal')
export class TeamglobalController {
  constructor(private readonly teamglobalService: TeamglobalService) {}

  @Roles(UserUserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createTeamglobal(
    @Body() createTeamglobalDTO: CreateTeamglobalDTO,
  ): Promise<TeamglobalEntity> {
    return this.teamglobalService.createTeamglobal(createTeamglobalDTO);
  }

  @Roles(UserUserTypeEnum.Admin, UserUserTypeEnum.User)
  @Get()
  async findAllTeamglobal(
    @Query('isWithoutCompetitionglobalRuleTypeLeague')
    isWithoutCompetitionglobalRuleTypeLeague?: boolean,

    @Query('isWithoutCompetitionglobalRuleTypeCup')
    isWithoutCompetitionglobalRuleTypeCup?: boolean,
  ): Promise<ReturnTeamglobalDTO[]> {
    const relations = {
      country: true,
      managerglobal: true,
      competitionsglobalTeamglobal: {
        competitionglobal: true,
      },
    };

    return (
      await this.teamglobalService.findAllTeamglobal(
        relations,
        Boolean(isWithoutCompetitionglobalRuleTypeLeague),
        Boolean(isWithoutCompetitionglobalRuleTypeCup),
      )
    ).map((teamglobal) => new ReturnTeamglobalDTO(teamglobal));
  }

  @Roles(UserUserTypeEnum.Admin)
  @Get('/:teamglobalId')
  async findTeamglobalById(
    @Param('teamglobalId') teamglobalId,
  ): Promise<ReturnTeamglobalDTO> {
    const relations = {
      country: true,
      managerglobal: true,
      playersglobal: {
        playersglobalPosition: {
          position: true,
        },
      },
      squadplanglobal: {
        formation: true,
      },
    };

    return new ReturnTeamglobalDTO(
      await this.teamglobalService.findTeamglobalById(teamglobalId, relations),
    );
  }

  @Roles(UserUserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:teamglobalId')
  async updateTeamglobal(
    @Body() updateTeamglobalDTO: UpdateTeamglobalDTO,
    @Param('teamglobalId') teamglobalId: number,
  ): Promise<TeamglobalEntity> {
    return this.teamglobalService.updateTeamglobal(
      updateTeamglobalDTO,
      teamglobalId,
    );
  }

  @Roles(UserUserTypeEnum.Admin)
  @Delete('/:teamglobalId')
  async deleteTeamglobal(
    @Param('teamglobalId') teamglobalId: number,
  ): Promise<DeleteResult> {
    return this.teamglobalService.deleteTeamglobal(teamglobalId);
  }
}
