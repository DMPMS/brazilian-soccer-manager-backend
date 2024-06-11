import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlayerglobalService } from './playerglobal.service';
import { CreatePlayerglobalDTO } from './dtos/createPlayerglobal.dto';
import { PlayerglobalEntity } from './entities/playerglobal.entity';
import { ReturnPlayerglobalDTO } from './dtos/returnPlayerglobal.dto';
import { UpdatePlayerglobalDTO } from './dtos/updatePlayerglobal.dto';
import { DeleteResult } from 'typeorm';

@Controller('playerglobal')
export class PlayerglobalController {
  constructor(private readonly playerglobalService: PlayerglobalService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createPlayerglobal(
    @Body() createPlayerglobalDTO: CreatePlayerglobalDTO,
  ): Promise<PlayerglobalEntity> {
    return this.playerglobalService.createPlayerglobal(createPlayerglobalDTO);
  }

  @Get()
  async findAllPlayerglobal(
    @Query('isWithoutTeamglobal') isWithoutTeamglobal?: boolean,
  ): Promise<ReturnPlayerglobalDTO[]> {
    const relations = {
      country: true,
      teamglobal: true,
      playersglobalPosition: {
        position: true,
      },
    };

    return (
      await this.playerglobalService.findAllPlayerglobal(
        relations,
        Boolean(isWithoutTeamglobal),
      )
    ).map((playerglobal) => new ReturnPlayerglobalDTO(playerglobal));
  }

  @Get('/:playerglobalId')
  async findPlayerglobalById(
    @Param('playerglobalId') playerglobalId,
  ): Promise<ReturnPlayerglobalDTO> {
    const relations = {
      country: true,
      teamglobal: true,
      playersglobalPosition: {
        position: true,
      },
    };

    return new ReturnPlayerglobalDTO(
      await this.playerglobalService.findPlayerglobalById(
        playerglobalId,
        relations,
      ),
    );
  }

  @UsePipes(ValidationPipe)
  @Put('/:playerglobalId')
  async updatePlayerglobal(
    @Body() updatePlayerglobalDTO: UpdatePlayerglobalDTO,
    @Param('playerglobalId') playerglobalId: number,
  ): Promise<PlayerglobalEntity> {
    return this.playerglobalService.updatePlayerglobal(
      updatePlayerglobalDTO,
      playerglobalId,
    );
  }

  @Delete('/:playerglobalId')
  async deletePlayerglobal(
    @Param('playerglobalId') playerglobalId: number,
  ): Promise<DeleteResult> {
    return this.playerglobalService.deletePlayerglobal(playerglobalId);
  }
}
