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
import { CompetitionglobalService } from './competitionglobal.service';
import { CompetitionglobalEntity } from './entities/competitionglobal.entity';
import { CreateCompetitionglobalDto } from './dtos/createCompetitionglobal.dto';
import { ReturnCompetitionglobalDto } from './dtos/returnCompetitionglobal.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/userType.enum';
import { UpdateCompetitionglobalDto } from './dtos/updateCompetitionglobal.dto';

@Controller('competitionglobal')
export class CompetitionglobalController {
  constructor(
    private readonly competitionglobalService: CompetitionglobalService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createCompetitionglobal(
    @Body() createCompetitionglobal: CreateCompetitionglobalDto,
  ): Promise<CompetitionglobalEntity> {
    return this.competitionglobalService.createCompetitionglobal(
      createCompetitionglobal,
    );
  }

  @Get()
  async findAllCompetitionglobal(): Promise<ReturnCompetitionglobalDto[]> {
    return (
      await this.competitionglobalService.findAllCompetitionglobal(true)
    ).map(
      (competitionglobal) => new ReturnCompetitionglobalDto(competitionglobal),
    );
  }

  @Roles(UserType.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:competitionglobalId')
  async updateCompetitionglobal(
    @Body() updateCompetitionglobal: UpdateCompetitionglobalDto,
    @Param('competitionglobalId') competitionglobalId: number,
  ): Promise<CompetitionglobalEntity> {
    return this.competitionglobalService.updateCompetitionglobal(
      updateCompetitionglobal,
      competitionglobalId,
    );
  }
}
