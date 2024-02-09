import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveEntity } from './entities/save.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaveEntity])],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
