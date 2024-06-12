import { Module, forwardRef } from '@nestjs/common';
import { TeamglobalService } from './teamglobal.service';
import { TeamglobalController } from './teamglobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { CountryModule } from 'src/country/country.module';
import { ManagerglobalModule } from 'src/managerglobal/managerglobal.module';
import { PlayerglobalModule } from 'src/playerglobal/playerglobal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamglobalEntity]),
    CountryModule,
    forwardRef(() => ManagerglobalModule),
    forwardRef(() => PlayerglobalModule),
  ],
  providers: [TeamglobalService],
  controllers: [TeamglobalController],
  exports: [TeamglobalService],
})
export class TeamglobalModule {}
