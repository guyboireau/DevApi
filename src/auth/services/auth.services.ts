import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.services';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User,'password'>) {
    const payload = {id: user.id, username: user.username, email:user.email, role:user.role };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
    };
  }
}