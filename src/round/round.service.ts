import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoundEntity } from './entities/round.entity';
import { CreateRoundDTO } from './dtos/createRound.dto';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(RoundEntity)
    private readonly roundRepository: Repository<RoundEntity>,
  ) {}

  async createRound(createRoundDTO: CreateRoundDTO): Promise<RoundEntity> {
    return this.roundRepository.save({
      competitionsaveId: createRoundDTO.competitionsaveId,
      name: createRoundDTO.name,
    });
  }
}
