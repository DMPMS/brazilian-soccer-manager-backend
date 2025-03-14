import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SquadplansaveEntity } from './entities/squadplansave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SquadplansaveEntity])],
})
export class SquadplansaveModule {}
