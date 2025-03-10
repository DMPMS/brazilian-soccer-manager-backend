import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetitionsaveEntity } from './entities/competitionsave.entity';
import { Repository } from 'typeorm';
import { generateRoundsAndMatches } from 'src/utils/generateRoundsAndMatches';
import { RoundService } from 'src/round/round.service';
import { MatchService } from 'src/match/match.service';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { SaveService } from 'src/save/save.service';

@Injectable()
export class CompetitionsaveService {
  constructor(
    @InjectRepository(CompetitionsaveEntity)
    private readonly competitionsaveRepository: Repository<CompetitionsaveEntity>,
    private readonly roundService: RoundService,
    private readonly matchService: MatchService,

    @Inject(forwardRef(() => SaveService))
    private readonly saveService: SaveService,
  ) {}

  async generateCompetitionsaveCalendar(
    competitionsaveId: number,
    teamsaveIds: number[],
  ): Promise<void> {
    const relations = { rule: true };
    const competitionsave =
      await this.findCompetitionsaveByIdToGenerateCalendar(
        competitionsaveId,
        relations,
      );

    const roundsAndMatches = generateRoundsAndMatches(
      competitionsave.rule.id,
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

  async findAllCompetitionsave(
    userId: number,
    saveId: number,
    relations?: RelationsOptionsType,
  ): Promise<CompetitionsaveEntity[]> {
    if (!saveId) {
      throw new NotFoundException(`saveId is required.`);
    }

    await this.saveService.findUserSaveById(userId, saveId);

    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        saveId: saveId,
      },
      order: {
        rule: {
          country: {
            name: 'ASC',
          },
          level: 'ASC',
        },
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const competitionssave =
      await this.competitionsaveRepository.find(findOptions);

    if (!competitionssave) {
      throw new NotFoundException(`Competitionssave not found.`);
    }

    return competitionssave;
  }

  async findCompetitionsaveByIdToGenerateCalendar(
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

  async findCompetitionsaveById(
    userId: number,
    saveId: number,
    competitionsaveId: number,
    relations?: RelationsOptionsType,
  ): Promise<CompetitionsaveEntity> {
    if (!saveId) {
      throw new NotFoundException(`saveId is required.`);
    }

    await this.saveService.findUserSaveById(userId, saveId);

    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: competitionsaveId,
        saveId: saveId,
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
