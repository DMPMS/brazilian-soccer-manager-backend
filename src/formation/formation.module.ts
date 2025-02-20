import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormationEntity } from './entities/formation.entity';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FormationEntity])],
  providers: [FormationService],
  controllers: [FormationController],
  exports: [FormationService],
})
export class FormationModule {}
