import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SaveEntity } from './entities/save.entity';
import { CreateSaveDTO } from './dtos/createSave.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SaveService {
  constructor(
    @InjectRepository(SaveEntity)
    private readonly saveRepository: Repository<SaveEntity>,
    private readonly userService: UserService,
  ) {}

  async createSave(
    createSaveDTO: CreateSaveDTO,
    userId: number,
  ): Promise<SaveEntity> {
    const save = await this.findUserSaveByName(
      userId,
      createSaveDTO.name,
    ).catch(() => undefined);

    if (save) {
      throw new BadRequestException(
        `Save name ${createSaveDTO.name} already exist for userId: ${userId}.`,
      );
    }

    return this.saveRepository.save({
      ...createSaveDTO,
      userId,
    });
  }

  async findSaveByUserId(userId: number): Promise<SaveEntity[]> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        userId: userId,
      },
      order: {
        updatedAt: 'DESC',
        id: 'DESC',
      },
    };

    const saves = await this.saveRepository.find(findOptions);

    if (!saves) {
      throw new NotFoundException(`Saves not found for userId: ${userId}.`);
    }

    return saves;
  }

  async findUserSaveByName(userId: number, name: string): Promise<SaveEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        userId: userId,
        name: name,
      },
    };

    const save = await this.saveRepository.findOne(findOptions);

    if (!save) {
      throw new NotFoundException(
        `Save name ${name} not found for userId: ${userId}.`,
      );
    }

    return save;
  }

  async findSaveById(saveId: number): Promise<SaveEntity> {
    let findOptions = {};

    findOptions = {
      ...findOptions,
      where: {
        id: saveId,
      },
    };

    const save = await this.saveRepository.findOne(findOptions);

    if (!save) {
      throw new NotFoundException(`saveId: ${saveId} not found.`);
    }

    return save;
  }

  async deleteSave(saveId: number, userId: number): Promise<DeleteResult> {
    const save = await this.findSaveById(saveId);

    if (save.userId !== userId) {
      // Better not to say that the save does not belong to the user.
      throw new NotFoundException(`saveId: ${saveId} not found.`);
    }

    return this.saveRepository.delete({ id: save.id });
  }
}
