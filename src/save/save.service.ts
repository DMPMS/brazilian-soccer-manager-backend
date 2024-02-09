import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaveEntity } from './entities/save.entity';
import { CreateSaveDto } from './dtos/createSave.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SaveService {
  constructor(
    @InjectRepository(SaveEntity)
    private readonly saveRepository: Repository<SaveEntity>,
    private readonly userService: UserService,
  ) {}

  async createSave(
    createSaveDto: CreateSaveDto,
    idUser: number,
  ): Promise<SaveEntity> {
    await this.userService.getUserById(idUser);

    return this.saveRepository.save({
      ...createSaveDto,
      idUser,
    });
  }
}
