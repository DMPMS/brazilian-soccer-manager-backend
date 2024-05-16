import { Module } from '@nestjs/common';
import { CompetitionglobalTeamglobalService } from './competitionglobal_teamglobal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionglobalTeamglobalEntity } from './entities/competitionglobal_teamglobal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitionglobalTeamglobalEntity])],
  providers: [CompetitionglobalTeamglobalService],
  exports: [CompetitionglobalTeamglobalService],
})
export class CompetitionglobalTeamglobalModule {}
