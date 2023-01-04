import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUserService} from './services/project-users.service';
import { ProjectUserController } from './controllers/project-users.controller';
import { Project } from '../entity/project.entity';
import { AuthModule } from '../auth/auth.module';
import { ProjectUser } from '../entity/project-user.entity';
import { ProjectsModule } from '../projects/project.module';
import { UsersModule } from '../users/users.module';
import { EventModule } from '../events/events.module';


@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser]),forwardRef(()=>AuthModule),forwardRef(()=>ProjectsModule),forwardRef(()=>UsersModule),forwardRef(()=>EventModule)],
  exports: [ProjectUserService],
  providers: [ProjectUserService],
  controllers: [ProjectUserController],
})
export class ProjectsUserModule {}
