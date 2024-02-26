import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SaveService } from './save.service';
import { CreateSaveDto } from './dtos/createSave.dto';
import { SaveEntity } from './entities/save.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enums/type.enum';
import { UserId } from 'src/decorators/userId.decorator';
import { ReturnSaveDto } from './dtos/returnSave.dto';

@Roles(UserType.User)
@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createSave(
    @Body() createSaveDto: CreateSaveDto,
    @UserId() userId: number,
  ): Promise<SaveEntity> {
    return this.saveService.createSave(createSaveDto, userId);
  }

  @Get()
  async findSaveByUserId(@UserId() userId: number): Promise<ReturnSaveDto[]> {
    return (await this.saveService.findSaveByUserId(userId)).map(
      (save) => new ReturnSaveDto(save),
    );
  }
}
