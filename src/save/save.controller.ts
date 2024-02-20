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
import { IdUser } from 'src/decorators/idUser.decorator';
import { ReturnSaveDto } from './dtos/returnSave.dto';

@Roles(UserType.User)
@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createSave(
    @Body() createSaveDto: CreateSaveDto,
    @IdUser() idUser: number,
  ): Promise<SaveEntity> {
    return this.saveService.createSave(createSaveDto, idUser);
  }

  @Get()
  async findSaveByIdUser(@IdUser() idUser: number): Promise<ReturnSaveDto[]> {
    return (await this.saveService.findSaveByIdUser(idUser)).map(
      (save) => new ReturnSaveDto(save),
    );
  }
}
