import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveEntity } from './entities/save.entity';
import { ManagerglobalModule } from 'src/managerglobal/managerglobal.module';
import { TeamglobalModule } from 'src/teamglobal/teamglobal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaveEntity]),
    ManagerglobalModule,
    TeamglobalModule,
  ],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
