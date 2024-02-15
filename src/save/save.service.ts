import { Injectable, NotFoundException } from '@nestjs/common';
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
    await this.userService.findUserById(idUser);

    return this.saveRepository.save({
      ...createSaveDto,
      idUser,
    });
  }

  async findSaveByUserId(idUser: number): Promise<SaveEntity[]> {
    const saves = await this.saveRepository.find({
      where: {
        idUser: idUser,
      },
    });

    if (!saves || saves.length === 0) {
      throw new NotFoundException(`Save not found for userId: ${idUser}`);
    }

    return saves;
  }
}
