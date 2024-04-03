import { Module } from '@nestjs/common';
import { ManagerglobalController } from './managerglobal.controller';
import { ManagerglobalService } from './managerglobal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerGlobalEntity } from './entities/managerglobal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerGlobalEntity])],
  controllers: [ManagerglobalController],
  providers: [ManagerglobalService],
})
export class ManagerglobalModule {}
