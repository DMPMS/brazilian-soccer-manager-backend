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
import { UpdateCompetitionglobalDTO } from './dtos/updateCompetitionglobal.dto';
import { DeleteResult } from 'typeorm';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';

@Controller('competitionglobal')
export class CompetitionglobalController {
  constructor(
    private readonly competitionglobalService: CompetitionglobalService,
  ) {}

  @Roles(UserUserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  async createCompetitionglobal(
    @Body() createCompetitionglobalDTO: CreateCompetitionglobalDTO,
  ): Promise<CompetitionglobalEntity> {
    return this.competitionglobalService.createCompetitionglobal(
      createCompetitionglobalDTO,
    );
  }

  @Roles(UserUserTypeEnum.Admin, UserUserTypeEnum.User)
  @Get()
  async findAllCompetitionglobal(): Promise<ReturnCompetitionglobalDTO[]> {
    const relations = {
      rule: true,
      country: true,
    };

    return (
      await this.competitionglobalService.findAllCompetitionglobal(relations)
    ).map(
      (competitionglobal) => new ReturnCompetitionglobalDTO(competitionglobal),
    );
  }

  @Roles(UserUserTypeEnum.Admin)
  @Get('/:competitionglobalId')
  async findCompetitionglobalById(
    @Param('competitionglobalId') competitionglobalId,
  ): Promise<ReturnCompetitionglobalDTO> {
    const relations = {
      rule: true,
      country: true,
      competitionsglobalTeamglobal: {
        teamglobal: true,
      },
    };

    return new ReturnCompetitionglobalDTO(
      await this.competitionglobalService.findCompetitionglobalById(
        competitionglobalId,
        relations,
      ),
    );
  }

  @Roles(UserUserTypeEnum.Admin)
  @UsePipes(ValidationPipe)
  @Put('/:competitionglobalId')
  async updateCompetitionglobal(
    @Body() updateCompetitionglobalDTO: UpdateCompetitionglobalDTO,
    @Param('competitionglobalId') competitionglobalId: number,
  ): Promise<CompetitionglobalEntity> {
    return this.competitionglobalService.updateCompetitionglobal(
      updateCompetitionglobalDTO,
      competitionglobalId,
    );
  }

  @Roles(UserUserTypeEnum.Admin)
  @Delete('/:competitionglobalId')
  async deleteCompetitionglobal(
    @Param('competitionglobalId') competitionglobalId: number,
  ): Promise<DeleteResult> {
    return this.competitionglobalService.deleteCompetitionglobal(
      competitionglobalId,
    );
  }
}
