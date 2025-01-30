import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingEntity } from './entities/ranking.entity';
import { RankingService } from './ranking.service';
import { CompetitionsaveModule } from 'src/competitionsave/competitionsave.module';

@Module({
  imports: [TypeOrmModule.forFeature([RankingEntity]), CompetitionsaveModule],
  providers: [RankingService],
})
export class RankingModule {}
