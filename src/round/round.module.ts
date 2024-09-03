import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundEntity } from './entities/round.entity';
import { RoundService } from './round.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoundEntity])],
  providers: [RoundService],
  exports: [RoundService],
})
export class RoundModule {}
