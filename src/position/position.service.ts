import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PositionEntity } from './entities/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(PositionEntity)
    private readonly positionRepository: Repository<PositionEntity>,
  ) {}

  async findAllPosition(): Promise<PositionEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        id: 'ASC',
      },
    };

    const positions = await this.positionRepository.find(findOptions);

    if (!positions) {
      throw new NotFoundException(`Positions not found.`);
    }

    return positions;
  }

  async findPositionById(positionId: number): Promise<PositionEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: positionId,
      },
    };

    const position = await this.positionRepository.findOne(findOptions);

    if (!position) {
      throw new NotFoundException(`positionId: ${positionId} not found.`);
    }

    return position;
  }
}
