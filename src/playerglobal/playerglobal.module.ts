import { Module, forwardRef } from '@nestjs/common';
import { PlayerglobalService } from './playerglobal.service';
import { PlayerglobalController } from './playerglobal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerglobalEntity } from './entities/playerglobal.entity';
import { CountryModule } from 'src/country/country.module';
import { TeamglobalModule } from 'src/teamglobal/teamglobal.module';
import { PositionModule } from 'src/position/position.module';
import { PlayerglobalPositionModule } from 'src/playerglobal_position/playerglobal_position.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerglobalEntity]),
    CountryModule,
    forwardRef(() => TeamglobalModule),
    PositionModule,
    PlayerglobalPositionModule,
  ],
  providers: [PlayerglobalService],
  controllers: [PlayerglobalController],
  exports: [PlayerglobalService],
})
export class PlayerglobalModule {}
