import { Module } from '@nestjs/common';
import { ManagerglobalController } from './managerglobal.controller';
import { ManagerglobalService } from './managerglobal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerGlobalEntity } from './entities/managerglobal.entity';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerGlobalEntity]), CountryModule],
  controllers: [ManagerglobalController],
  providers: [ManagerglobalService],
})
export class ManagerglobalModule {}
