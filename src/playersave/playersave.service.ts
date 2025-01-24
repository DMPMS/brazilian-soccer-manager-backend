import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PlayersaveEntity } from './entities/playersave.entity';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { countPlayersaveByTeamsaveId } from './dtos/countPlayersaveByTeamsaveId.dto';
import { SaveService } from 'src/save/save.service';

@Injectable()
export class PlayersaveService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(PlayersaveEntity)
    private readonly playersaveRepository: Repository<PlayersaveEntity>,
    private readonly saveService: SaveService,
  ) {}

  async findAllPlayersave(
    userId: number,
    saveId: number,
    relations?: RelationsOptionsType,
  ): Promise<PlayersaveEntity[]> {
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
        updatedAt: 'DESC',
        id: 'DESC',
      },
    };

    if (relations && Object.keys(relations).length > 0) {
      findOptions = {
        ...findOptions,
        relations,
      };
    }

    const playerssave = await this.playersaveRepository.find(findOptions);

    if (!playerssave) {
      throw new NotFoundException(`Playerssave not found.`);
    }

    return playerssave;
  }

  async countPlayersaveByTeamsaveId(): Promise<countPlayersaveByTeamsaveId[]> {
    return await this.dataSource
      .createQueryBuilder()
      .select('playersave.teamsave_id')
      .addSelect('COUNT(*)', 'total')
      .from(PlayersaveEntity, 'playersave')
      .where('playersave.teamsave_id IS NOT NULL')
      .groupBy('playersave.teamsave_id')
      .getRawMany();
  }
}
