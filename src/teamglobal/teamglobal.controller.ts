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
import { CreateTeamglobalDto } from './dtos/createTeamglobal.dto';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { ReturnTeamglobalDto } from './dtos/returnTeamglobal.dto';
import { UpdateTeamglobalDto } from './dtos/updateTeamglobal.dto';

@Roles(UserType.Admin)
@Controller('teamglobal')
export class TeamglobalController {
  constructor(private readonly teamglobalService: TeamglobalService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createTeamglobal(
    @Body() createTeamglobal: CreateTeamglobalDto,
  ): Promise<TeamglobalEntity> {
    return this.teamglobalService.createTeamglobal(createTeamglobal);
  }

  @Get()
  async findAllTeamglobal(): Promise<ReturnTeamglobalDto[]> {
    return (
      await this.teamglobalService.findAllTeamglobal(undefined, true)
    ).map((teamglobal) => new ReturnTeamglobalDto(teamglobal));
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:teamglobalId')
  async updateTeamglobal(
    @Body() updateTeamglobal: UpdateTeamglobalDto,
    @Param('teamglobalId') teamglobalId: number,
  ): Promise<TeamglobalEntity> {
    return this.teamglobalService.updateTeamglobal(
      updateTeamglobal,
      teamglobalId,
    );
  }
}
