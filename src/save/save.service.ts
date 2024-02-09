import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveEntity } from './entities/save.entity';
import { CreateSaveDto } from './dtos/createSave.dto';

@Injectable()
export class SaveService {
  constructor(
    @InjectRepository(SaveEntity)
    private readonly saveRepository: Repository<SaveEntity>,
  ) {}

  async createSave(
    createSaveDto: CreateSaveDto,
    idUser: number,
  ): Promise<SaveEntity> {
    return this.saveRepository.save({
      ...createSaveDto,
      idUser,
    });
  }
}
