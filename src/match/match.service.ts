import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchEntity } from './entities/match.entity';
import { Repository } from 'typeorm';
import { CreateMatchDTO } from './dtos/createMatch.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchEntity)
    private readonly matchRepository: Repository<MatchEntity>,
  ) {}

  async createMatch(createMatchDTO: CreateMatchDTO): Promise<MatchEntity> {
    return this.matchRepository.save({
      roundId: createMatchDTO.roundId,
      teamsaveHomeId: createMatchDTO.teamsaveHomeId,
      teamsaveAwayId: createMatchDTO.teamsaveAwayId,
      date: createMatchDTO.date,
      teamsaveHomeGoals: null,
      teamsaveAwayGoals: null,
    });
  }
}
