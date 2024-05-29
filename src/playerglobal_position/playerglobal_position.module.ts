import { Module } from '@nestjs/common';
import { PlayerglobalPositionService } from './playerglobal_position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerglobalPositionEntity } from './entities/playerglobal_position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerglobalPositionEntity])],
  providers: [PlayerglobalPositionService],
  exports: [PlayerglobalPositionService],
})
export class PlayerglobalPositionModule {}
