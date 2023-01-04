import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService} from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { Project } from '../entity/project.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProjectsUserModule } from '../project-users/project-users.module';
import { EventModule } from '../events/events.module';


@Module({
  imports: [TypeOrmModule.forFeature([Project]),forwardRef(()=>AuthModule),forwardRef(()=>UsersModule),forwardRef(()=>ProjectsUserModule),forwardRef(()=>EventModule) ],
  exports: [ProjectService],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectsModule {}
