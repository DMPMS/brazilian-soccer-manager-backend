import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAllCompetitionglobalTeamglobal(): Promise<
    CompetitionglobalTeamglobalEntity[]
  > {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        id: 'ASC',
      },
    };

    const competitionsglobalTeamglobal =
      await this.competitionglobalTeamglobalRepository.find(findOptions);

    if (!competitionsglobalTeamglobal) {
      throw new NotFoundException(`CompetitionsglobalTeamglobal not found.`);
    }

    return competitionsglobalTeamglobal;
  }

  async deleteCompetitionglobalTeamglobalByCompetitionglobalId(
    competitionglobalId: number,
  ): Promise<DeleteResult> {
    return this.competitionglobalTeamglobalRepository.delete({
      competitionglobalId,
    });
  }
}
