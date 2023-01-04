import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService} from './services/events.services';
import { EventController } from './controllers/events.controller';
import { Project } from '../entity/project.entity';
import { AuthModule } from '../auth/auth.module';
import { Event } from '../entity/Event.entity';
import { ProjectsModule } from '../projects/project.module';
import { UsersModule } from '../users/users.module';
import { ProjectsUserModule } from '../project-users/project-users.module';


@Module({
  imports: [TypeOrmModule.forFeature([Event]),forwardRef(()=>AuthModule),forwardRef(()=>ProjectsModule),forwardRef(()=>UsersModule),forwardRef(()=>ProjectsUserModule)],
  exports: [EventService],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
