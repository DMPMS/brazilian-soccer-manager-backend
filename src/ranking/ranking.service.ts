import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RankingEntity } from './entities/ranking.entity';
import { Repository } from 'typeorm';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { CompetitionsaveService } from 'src/competitionsave/competitionsave.service';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(RankingEntity)
    private readonly rankingRepository: Repository<RankingEntity>,

    private readonly competitionSave: CompetitionsaveService,
  ) {}

  async findRankingByCompetitionsaveId(
    userId: number,
    saveId: number,
    competitionsaveId: number,
    relations?: RelationsOptionsType,
  ): Promise<RankingEntity[]> {
    if (!saveId) {
      throw new NotFoundException(`saveId is required.`);
    }

    await this.competitionSave.findCompetitionsaveById(
      userId,
      saveId,
      competitionsaveId,
    );

    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        competitionsaveId: competitionsaveId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const rankings = await this.rankingRepository.find(findOptions);

    if (!rankings) {
      throw new NotFoundException(`Rankings not found.`);
    }

    return rankings;
  }
}
