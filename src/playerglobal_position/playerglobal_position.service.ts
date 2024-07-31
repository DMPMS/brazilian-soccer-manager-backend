import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerglobalPositionEntity } from './entities/playerglobal_position.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PlayerglobalPositionService {
  constructor(
    @InjectRepository(PlayerglobalPositionEntity)
    private readonly playerglobalPositionRepository: Repository<PlayerglobalPositionEntity>,
  ) {}

  async createPlayerglobalPosition(
    playerglobalId: number,
    positionId: number,
    rating: number,
  ): Promise<PlayerglobalPositionEntity> {
    return this.playerglobalPositionRepository.save({
      playerglobalId,
      positionId,
      rating,
    });
  }

  async findAllPlayerglobalPosition(): Promise<PlayerglobalPositionEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        id: 'ASC',
      },
    };

    const playersglobalPosition =
      await this.playerglobalPositionRepository.find(findOptions);

    if (!playersglobalPosition) {
      throw new NotFoundException(`PlayersglobalPosition not found.`);
    }

    return playersglobalPosition;
  }

  async deletePlayerglobalPositionByPlayerglobalId(
    playerglobalId: number,
  ): Promise<DeleteResult> {
    return this.playerglobalPositionRepository.delete({
      playerglobalId,
    });
  }
}
