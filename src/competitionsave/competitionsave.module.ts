import { Module } from '@nestjs/common';
import { CompetitionsaveService } from './competitionsave.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionsaveEntity } from './entities/competitionsave.entity';
import { RoundModule } from 'src/round/round.module';
import { MatchModule } from 'src/match/match.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetitionsaveEntity]),
    RoundModule,
    MatchModule,
  ],
  providers: [CompetitionsaveService],
  exports: [CompetitionsaveService],
})
export class CompetitionsaveModule {}
