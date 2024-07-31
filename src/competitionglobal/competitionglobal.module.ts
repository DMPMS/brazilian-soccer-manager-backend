import { Module } from '@nestjs/common';
import { CompetitionglobalService } from './competitionglobal.service';
import { CompetitionglobalController } from './competitionglobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from 'src/country/country.module';
import { RuleModule } from 'src/rule/rule.module';
import { CompetitionglobalEntity } from './entities/competitionglobal.entity';
import { CompetitionglobalTeamglobalModule } from 'src/competitionglobal_teamglobal/competitionglobal_teamglobal.module';
import { TeamglobalModule } from 'src/teamglobal/teamglobal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetitionglobalEntity]),
    RuleModule,
    CountryModule,
    TeamglobalModule,
    CompetitionglobalTeamglobalModule,
  ],
  providers: [CompetitionglobalService],
  controllers: [CompetitionglobalController],
  exports: [CompetitionglobalService],
})
export class CompetitionglobalModule {}
