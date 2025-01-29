import { forwardRef, Module } from '@nestjs/common';
import { CompetitionsaveService } from './competitionsave.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionsaveEntity } from './entities/competitionsave.entity';
import { RoundModule } from 'src/round/round.module';
import { MatchModule } from 'src/match/match.module';
import { SaveModule } from 'src/save/save.module';
import { CompetitionsaveController } from './competitionsave.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetitionsaveEntity]),
    RoundModule,
    MatchModule,
    forwardRef(() => SaveModule),
  ],
  providers: [CompetitionsaveService],
  controllers: [CompetitionsaveController],
  exports: [CompetitionsaveService],
})
export class CompetitionsaveModule {}
