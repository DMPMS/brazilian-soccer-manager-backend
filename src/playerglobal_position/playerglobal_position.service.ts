import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerglobalPositionEntity } from './entities/playerglobal_position.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePlayerglobalPositionlDTO } from './dtos/createPlayerglobalPosition.dto';

@Injectable()
export class PlayerglobalPositionService {
  constructor(
    @InjectRepository(PlayerglobalPositionEntity)
    private readonly playerglobalPositionRepository: Repository<PlayerglobalPositionEntity>,
  ) {}

  async createPlayerglobalPosition(
    createPlayerglobalPositionDTO: CreatePlayerglobalPositionlDTO,
  ): Promise<PlayerglobalPositionEntity> {
    return this.playerglobalPositionRepository.save(
      createPlayerglobalPositionDTO,
    );
  }

  async findAllPlayerglobalPosition(): Promise<PlayerglobalPositionEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
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
