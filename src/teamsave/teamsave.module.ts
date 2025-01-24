import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsaveEntity } from './entities/teamsave.entity';
import { TeamsaveService } from './teamsave.service';
import { TeamsaveController } from './teamsave.controller';
import { PlayersaveModule } from 'src/playersave/playersave.module';
import { SaveModule } from 'src/save/save.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamsaveEntity]),
    PlayersaveModule,
    SaveModule,
  ],
  providers: [TeamsaveService],
  controllers: [TeamsaveController],
})
export class TeamsaveModule {}
