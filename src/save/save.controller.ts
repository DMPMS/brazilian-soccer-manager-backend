import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SaveService } from './save.service';
import { CreateSaveDTO } from './dtos/createSave.dto';
import { SaveEntity } from './entities/save.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/userType.enum';
import { UserId } from 'src/decorators/userId.decorator';
import { ReturnSaveDTO } from './dtos/returnSave.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.User, UserType.Admin)
@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createSave(
    @Body() createSaveDTO: CreateSaveDTO,
    @UserId() userId: number,
  ): Promise<SaveEntity> {
    return this.saveService.createSave(createSaveDTO, userId);
  }

  @Delete('/:saveId')
  async deleteSave(
    @Param('saveId') saveId: number,
    @UserId() userId: number,
  ): Promise<DeleteResult> {
    return this.saveService.deleteSave(saveId, userId);
  }

  @Get()
  async findSaveByUserId(@UserId() userId: number): Promise<ReturnSaveDTO[]> {
    const relations = {
      controllerManagersave: {
        teamsave: true,
      },
    };

    return (await this.saveService.findSaveByUserId(userId, relations)).map(
      (save) => new ReturnSaveDTO(save),
    );
  }
}
