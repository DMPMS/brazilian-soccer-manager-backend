import { Module } from '@nestjs/common';
import { TeamglobalService } from './teamglobal.service';
import { TeamglobalController } from './teamglobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamglobalEntity } from './entities/teamglobal.entity';
import { CountryModule } from 'src/country/country.module';
import { ManagerglobalModule } from 'src/managerglobal/managerglobal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamglobalEntity]),
    CountryModule,
    ManagerglobalModule,
  ],
  providers: [TeamglobalService],
  controllers: [TeamglobalController],
})
export class TeamglobalModule {}
