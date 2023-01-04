/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { User } from './entity/user.entity';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users.services';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/project.module';
import { Project } from './entity/project.entity';
import { ProjectsUserModule } from './project-users/project-users.module';
import { ProjectUser } from './entity/project-user.entity';
import { EventModule } from './events/events.module';



@Module({  
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities:  [User,Project,ProjectUser,Event],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,AuthModule,ProjectsModule,ProjectsUserModule,EventModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
