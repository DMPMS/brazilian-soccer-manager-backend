import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetitionglobalTeamglobalEntity } from './entities/competitionglobal_teamglobal.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CompetitionglobalTeamglobalService {
  constructor(
    @InjectRepository(CompetitionglobalTeamglobalEntity)
    private readonly competitionglobalTeamglobalRepository: Repository<CompetitionglobalTeamglobalEntity>,
  ) {}

  async createCompetitionglobalTeamglobal(
    competitionglobalId: number,
    teamglobalId: number,
  ): Promise<CompetitionglobalTeamglobalEntity> {
    return this.competitionglobalTeamglobalRepository.save({
      competitionglobalId,
      teamglobalId,
    });
  }

  async deleteCompetitionglobalTeamglobal(
    competitionglobalId: number,
  ): Promise<DeleteResult> {
    return this.competitionglobalTeamglobalRepository.delete({
      competitionglobalId,
    });
  }
}
