import { Module } from '@nestjs/common';
import { CompetitionglobalService } from './competitionglobal.service';
import { CompetitionglobalController } from './competitionglobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from 'src/country/country.module';
import { RuleModule } from 'src/rule/rule.module';
import { CompetitionglobalEntity } from './entities/competitionglobal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetitionglobalEntity]),
    RuleModule,
    CountryModule,
  ],
  providers: [CompetitionglobalService],
  controllers: [CompetitionglobalController],
})
export class CompetitionglobalModule {}
