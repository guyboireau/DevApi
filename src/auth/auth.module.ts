import { Module,forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.services';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ProjectsModule } from '../projects/project.module';
import { ProjectsUserModule } from '../project-users/project-users.module';
import { EventModule } from '../events/events.module';


@Module({
  imports: [forwardRef(()=>UsersModule),forwardRef(()=>ProjectsModule),forwardRef(()=>EventModule),forwardRef(()=>ProjectsUserModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),    
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService,JwtStrategy,LocalStrategy],
})
export class AuthModule {}