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
import { CompetitionglobalService } from './competitionglobal.service';
import { CompetitionglobalEntity } from './entities/competitionglobal.entity';
import { CreateCompetitionglobalDTO } from './dtos/createCompetitionglobal.dto';
import { ReturnCompetitionglobalDTO } from './dtos/returnCompetitionglobal.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/userType.enum';
import { UpdateCompetitionglobalDTO } from './dtos/updateCompetitionglobal.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.Admin)
@Controller('competitionglobal')
export class CompetitionglobalController {
  constructor(
    private readonly competitionglobalService: CompetitionglobalService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createCompetitionglobal(
    @Body() createCompetitionglobal: CreateCompetitionglobalDTO,
  ): Promise<CompetitionglobalEntity> {
    return this.competitionglobalService.createCompetitionglobal(
      createCompetitionglobal,
    );
  }

  @Get()
  async findAllCompetitionglobal(): Promise<ReturnCompetitionglobalDTO[]> {
    return (
      await this.competitionglobalService.findAllCompetitionglobal([
        'rule',
        'country',
      ])
    ).map(
      (competitionglobal) => new ReturnCompetitionglobalDTO(competitionglobal),
    );
  }

  @UsePipes(ValidationPipe)
  @Put('/:competitionglobalId')
  async updateCompetitionglobal(
    @Body() updateCompetitionglobal: UpdateCompetitionglobalDTO,
    @Param('competitionglobalId') competitionglobalId: number,
  ): Promise<CompetitionglobalEntity> {
    return this.competitionglobalService.updateCompetitionglobal(
      updateCompetitionglobal,
      competitionglobalId,
    );
  }

  @Delete('/:competitionglobalId')
  async deleteCompetitionglobal(
    @Param('competitionglobalId') competitionglobalId: number,
  ): Promise<DeleteResult> {
    return this.competitionglobalService.deleteCompetitionglobal(
      competitionglobalId,
    );
  }
}
