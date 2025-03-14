import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchEntity } from './entities/match.entity';
import { Repository } from 'typeorm';
import { CreateMatchDTO } from './dtos/createMatch.dto';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { SaveService } from 'src/save/save.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchEntity)
    private readonly matchRepository: Repository<MatchEntity>,
    @Inject(forwardRef(() => SaveService))
    private readonly saveService: SaveService,
  ) {}

  async createMatch(createMatchDTO: CreateMatchDTO): Promise<MatchEntity> {
    return this.matchRepository.save(createMatchDTO);
  }

  async findPlayMatch(
    userId: number,
    saveId: number,
    matchId: number,
    relations?: RelationsOptionsType,
  ): Promise<MatchEntity> {
    if (!saveId) {
      throw new NotFoundException(`saveId is required.`);
    }

    await this.saveService.findUserSaveById(userId, saveId);

    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: matchId,
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const match = await this.matchRepository.findOne(findOptions);

    if (!match) {
      throw new NotFoundException(`matchId: ${matchId} not found.`);
    }

    return match;
  }
}
