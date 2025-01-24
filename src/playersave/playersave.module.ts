import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersaveEntity } from './entities/playersave.entity';
import { PlayersaveService } from './playersave.service';
import { PlayersaveController } from './playersave.controller';
import { SaveModule } from 'src/save/save.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlayersaveEntity]), SaveModule],
  providers: [PlayersaveService],
  controllers: [PlayersaveController],
  exports: [PlayersaveService],
})
export class PlayersaveModule {}
