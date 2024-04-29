import { Module } from '@nestjs/common';
import { ManagerglobalController } from './managerglobal.controller';
import { ManagerglobalService } from './managerglobal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerglobalEntity } from './entities/managerglobal.entity';
import { CountryModule } from 'src/country/country.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerglobalEntity]), CountryModule],
  controllers: [ManagerglobalController],
  providers: [ManagerglobalService],
  exports: [ManagerglobalService],
})
export class ManagerglobalModule {}
