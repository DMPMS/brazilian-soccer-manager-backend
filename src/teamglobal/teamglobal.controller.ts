import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserType } from 'src/user/enums/userType.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { TeamglobalService } from './teamglobal.service';
import { CreateTeamglobalDto } from './dtos/createTeamglobal.dto';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { ReturnTeamglobalDto } from './dtos/returnTeamglobal.dto';

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
    return (await this.teamglobalService.findAllTeamglobal(true)).map(
      (teamglobal) => new ReturnTeamglobalDto(teamglobal),
    );
  }
}
