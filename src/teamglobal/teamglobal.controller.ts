import {
  Body,
  Controller,
  Delete,
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
import { DeleteResult } from 'typeorm';

@Roles(UserType.Admin)
@Controller('teamglobal')
export class TeamglobalController {
  constructor(private readonly teamglobalService: TeamglobalService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createTeamglobal(
    @Body() createTeamglobalDTO: CreateTeamglobalDTO,
  ): Promise<TeamglobalEntity> {
    return this.teamglobalService.createTeamglobal(createTeamglobalDTO);
  }

  @Get()
  async findAllTeamglobal(): Promise<ReturnTeamglobalDTO[]> {
    const relations = {
      country: true,
      managerglobal: true,
      competitionsglobalTeamglobal: {
        competitionglobal: true,
      },
    };

    return (await this.teamglobalService.findAllTeamglobal(relations)).map(
      (teamglobal) => new ReturnTeamglobalDTO(teamglobal),
    );
  }

  @Get('/:teamglobalId')
  async findTeamglobalById(
    @Param('teamglobalId') teamglobalId,
  ): Promise<ReturnTeamglobalDTO> {
    const relations = {
      country: true,
      managerglobal: true,
      playersglobal: true,
    };

    return new ReturnTeamglobalDTO(
      await this.teamglobalService.findTeamglobalById(teamglobalId, relations),
    );
  }

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

  @Delete('/:teamglobalId')
  async deleteTeamglobal(
    @Param('teamglobalId') teamglobalId: number,
  ): Promise<DeleteResult> {
    return this.teamglobalService.deleteTeamglobal(teamglobalId);
  }
}
