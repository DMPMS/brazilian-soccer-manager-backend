import { forwardRef, Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEntity } from './entities/match.entity';
import { SaveModule } from 'src/save/save.module';
import { MatchController } from './match.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MatchEntity]),
    forwardRef(() => SaveModule),
  ],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService],
})
export class MatchModule {}
