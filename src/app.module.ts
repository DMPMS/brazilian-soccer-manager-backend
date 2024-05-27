import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaveModule } from './save/save.module';
import { CountryModule } from './country/country.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { ManagerglobalModule } from './managerglobal/managerglobal.module';
import { TeamglobalModule } from './teamglobal/teamglobal.module';
import { RuleModule } from './rule/rule.module';
import { CompetitionglobalModule } from './competitionglobal/competitionglobal.module';
import { CompetitionglobalTeamglobalModule } from './competitionglobal_teamglobal/competitionglobal_teamglobal.module';
import { PositionModule } from './position/position.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    SaveModule,
    CountryModule,
    AuthModule,
    JwtModule,
    ManagerglobalModule,
    TeamglobalModule,
    RuleModule,
    CompetitionglobalModule,
    CompetitionglobalTeamglobalModule,
    PositionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
