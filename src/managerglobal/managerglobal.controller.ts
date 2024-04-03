import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerglobalService } from './managerglobal.service';
import { CreateManagerGlobalDto } from './dtos/createManagerGlobal.dto';
import { ManagerGlobalEntity } from './entities/managerglobal.entity';
import { ReturnManagerGlobalDto } from './dtos/returnManagerGlobal.dto';

@Controller('managerglobal')
export class ManagerglobalController {
  constructor(private readonly managerGlobalService: ManagerglobalService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createManagerGlobal(
    @Body() createManagerGlobal: CreateManagerGlobalDto,
  ): Promise<ManagerGlobalEntity> {
    return this.managerGlobalService.createManagerGlobal(createManagerGlobal);
  }

  @Get()
  async findAllManagerGlobal(): Promise<ReturnManagerGlobalDto[]> {
    return (await this.managerGlobalService.findAllManagerGlobal(true)).map(
      (managerglobal) => new ReturnManagerGlobalDto(managerglobal),
    );
  }
}
