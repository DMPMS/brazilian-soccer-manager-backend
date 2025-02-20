import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormationEntity } from './entities/formation.entity';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(FormationEntity)
    private readonly formationRepository: Repository<FormationEntity>,
  ) {}

  async findAllFormation(): Promise<FormationEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      order: {
        id: 'ASC',
      },
    };

    const formations = await this.formationRepository.find(findOptions);

    if (!formations) {
      throw new NotFoundException(`Formations not found.`);
    }

    return formations;
  }
}
