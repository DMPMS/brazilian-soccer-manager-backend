import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveEntity } from './entities/save.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SaveEntity]), UserModule],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
