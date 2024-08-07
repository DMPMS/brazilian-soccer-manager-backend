import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveEntity } from './entities/save.entity';
import { ManagerglobalModule } from 'src/managerglobal/managerglobal.module';
import { TeamglobalModule } from 'src/teamglobal/teamglobal.module';
import { PlayerglobalModule } from 'src/playerglobal/playerglobal.module';
import { PlayerglobalPositionModule } from 'src/playerglobal_position/playerglobal_position.module';
import { CompetitionglobalModule } from 'src/competitionglobal/competitionglobal.module';
import { CompetitionglobalTeamglobalModule } from 'src/competitionglobal_teamglobal/competitionglobal_teamglobal.module';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaveEntity]),
    ManagerglobalModule,
    TeamglobalModule,
    PlayerglobalModule,
    PlayerglobalPositionModule,
    CompetitionglobalModule,
    CompetitionglobalTeamglobalModule,
    CountryModule,
  ],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
