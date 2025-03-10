import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamsaveEntity } from './entities/teamsave.entity';
import { PlayersaveService } from 'src/playersave/playersave.service';
import { RelationsOptionsType } from 'src/types/RelationsOptions.type';
import { CountPlayersaveByTeamsaveId } from 'src/playersave/dtos/countPlayersaveByTeamsaveId.dto';
import { SaveService } from 'src/save/save.service';

@Injectable()
export class TeamsaveService {
  constructor(
    @InjectRepository(TeamsaveEntity)
    private readonly teamsaveRepository: Repository<TeamsaveEntity>,
    private readonly playersaveService: PlayersaveService,
    private readonly saveService: SaveService,
  ) {}

  async findAllTeamsave(
    userId: number,
    saveId: number,
    relations?: RelationsOptionsType,
  ): Promise<TeamsaveEntity[]> {
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

    const teamssave = await this.teamsaveRepository.find(findOptions);

    if (!teamssave) {
      throw new NotFoundException(`Teamssave not found.`);
    }

    const countPlayerssaveList =
      await this.playersaveService.countPlayersaveByTeamsaveId();

    return teamssave.map((teamsave) => {
      return {
        ...teamsave,
        playerssaveCount: Number(
          this.countPlayerssaveInTeamsave(teamsave.id, countPlayerssaveList),
        ),
      };
    });
  }

  countPlayerssaveInTeamsave(
    teamsaveId: number,
    countPlayerssaveList: CountPlayersaveByTeamsaveId[],
  ): number {
    const count = countPlayerssaveList.find(
      (item) => item.teamsave_id === teamsaveId,
    );

    if (count) {
      return count.total;
    }

    return 0;
  }
}
