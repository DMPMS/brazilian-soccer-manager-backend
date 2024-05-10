import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleEntity } from './entities/rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RuleEntity])],
  providers: [RuleService],
  controllers: [RuleController],
  exports: [RuleService],
})
export class RuleModule {}
