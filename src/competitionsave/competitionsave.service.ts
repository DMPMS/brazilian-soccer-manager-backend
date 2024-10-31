import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetitionsaveEntity } from './entities/competitionsave.entity';
import { Repository } from 'typeorm';
import { generateRoundsAndMatches } from 'src/utils/generateRoundsAndMatches';
import { RoundService } from 'src/round/round.service';
import { MatchService } from 'src/match/match.service';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';

@Injectable()
export class CompetitionsaveService {
  constructor(
    @InjectRepository(CompetitionsaveEntity)
    private readonly competitionsaveRepository: Repository<CompetitionsaveEntity>,
    private readonly roundService: RoundService,
    private readonly matchService: MatchService,
  ) {}

  async generateCompetitionsaveCalendar(
    competitionsaveId: number,
    teamsaveIds: number[],
  ): Promise<void> {
    const relations = { rule: true };
    const competitionsave = await this.findCompetitionsaveById(
      competitionsaveId,
      relations,
    );

    const roundsAndMatches = generateRoundsAndMatches(
      competitionsave.rule.competitionType,
      teamsaveIds,
    );

    for (const [index, roundMatches] of roundsAndMatches.entries()) {
      const roundName = `Rodada ${index + 1}`;
      const round = await this.roundService.createRound({
        competitionsaveId: competitionsaveId,
        name: roundName,
      });

      await Promise.all(
        roundMatches.map((match) =>
          this.matchService.createMatch({
            roundId: round.id,
            teamsaveHomeId: match.teamsaveHomeId,
            teamsaveAwayId: match.teamsaveAwayId,
            date: match.date,
          }),
        ),
      );
    }
  }

  async findCompetitionsaveById(
    competitionsaveId: number,
    relations?: RelationsOptionsType,
  ): Promise<CompetitionsaveEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: competitionsaveId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const competitionsave =
      await this.competitionsaveRepository.findOne(findOptions);

    if (!competitionsave) {
      throw new NotFoundException(
        `competitionsaveId: ${competitionsaveId} not found.`,
      );
    }

    return competitionsave;
  }
}
