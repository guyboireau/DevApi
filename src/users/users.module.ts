import { Module,forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/users.services';
import { UsersController } from './controllers/users.controller';
import { User } from '../entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { EventModule } from '../events/events.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]),forwardRef(()=>AuthModule),forwardRef(()=>EventModule)],
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
