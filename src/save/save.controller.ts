import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SaveService } from './save.service';
import { CreateSaveDto } from './dtos/createSave.dto';
import { SaveEntity } from './entities/save.entity';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post('/:idUser')
  @UsePipes(ValidationPipe)
  async createSave(
    @Body() createSaveDto: CreateSaveDto,
    @Param('idUser') idUser: number,
  ): Promise<SaveEntity> {
    return this.saveService.createSave(createSaveDto, idUser);
  }
}
