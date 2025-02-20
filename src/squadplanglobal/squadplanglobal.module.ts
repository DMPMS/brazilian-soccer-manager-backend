import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SquadplanglobalEntity } from './entities/squadplanglobal.entity';
import { SquadplanglobalService } from './squadplanglobal.service';

@Module({
  imports: [TypeOrmModule.forFeature([SquadplanglobalEntity])],
  providers: [SquadplanglobalService],
  exports: [SquadplanglobalService],
})
export class SquadplanglobalModule {}
