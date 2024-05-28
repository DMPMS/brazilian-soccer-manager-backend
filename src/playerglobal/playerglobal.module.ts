import { Module } from '@nestjs/common';
import { PlayerglobalService } from './playerglobal.service';
import { PlayerglobalController } from './playerglobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerglobalEntity } from './entities/playerglobal.entity';
import { CountryModule } from 'src/country/country.module';
import { TeamglobalModule } from 'src/teamglobal/teamglobal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerglobalEntity]),
    CountryModule,
    TeamglobalModule,
  ],
  providers: [PlayerglobalService],
  controllers: [PlayerglobalController],
})
export class PlayerglobalModule {}
