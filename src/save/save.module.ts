import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveEntity } from './entities/save.entity';
import { ManagerglobalModule } from 'src/managerglobal/managerglobal.module';
import { TeamglobalModule } from 'src/teamglobal/teamglobal.module';
import { PlayerglobalModule } from 'src/playerglobal/playerglobal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaveEntity]),
    ManagerglobalModule,
    TeamglobalModule,
    PlayerglobalModule,
  ],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
