import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEntity } from './entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchEntity])],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
