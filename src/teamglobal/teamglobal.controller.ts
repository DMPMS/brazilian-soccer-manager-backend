import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserType } from 'src/user/enums/userType.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { TeamglobalService } from './teamglobal.service';
import { CreateTeamglobalDTO } from './dtos/createTeamglobal.dto';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { ReturnTeamglobalDTO } from './dtos/returnTeamglobal.dto';
import { UpdateTeamglobalDTO } from './dtos/updateTeamglobal.dto';

@Roles(UserType.Admin)
@Controller('teamglobal')
export class TeamglobalController {
  constructor(private readonly teamglobalService: TeamglobalService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createTeamglobal(
    @Body() createTeamglobal: CreateTeamglobalDTO,
  ): Promise<TeamglobalEntity> {
    return this.teamglobalService.createTeamglobal(createTeamglobal);
  }

  @Get()
  async findAllTeamglobal(): Promise<ReturnTeamglobalDTO[]> {
    return (
      await this.teamglobalService.findAllTeamglobal(undefined, true)
    ).map((teamglobal) => new ReturnTeamglobalDTO(teamglobal));
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:teamglobalId')
  async updateTeamglobal(
    @Body() updateTeamglobal: UpdateTeamglobalDTO,
    @Param('teamglobalId') teamglobalId: number,
  ): Promise<TeamglobalEntity> {
    return this.teamglobalService.updateTeamglobal(
      updateTeamglobal,
      teamglobalId,
    );
  }
}
