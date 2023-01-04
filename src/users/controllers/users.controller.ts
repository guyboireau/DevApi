import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto/create-user.dto';
import { User } from '../../entity/user.entity';
import { UsersService } from '../services/users.services';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.services';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
  


// @Controller('users')
// export class UsersController {
// constructor(private UserService: UsersService) {}

// // }
// @Post('auth/sign-up')
//  @UsePipes(ValidationPipe)
//  signup(@Body() CreateUserDto:CreateUserDto)
//  {
//    return this.UserService.CreateUser(CreateUserDto)
//  }
// }


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  async signup(@Body() CreateUserDto:CreateUserDto):Promise<CreateUserDto>
  {
    return await this.usersService.create(CreateUserDto);
  }  
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body : LoginUserDto ,@Req() req) {
    return this.authService.login(req.user);
  }  

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req)   {
    return req.user;
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneByid(@Param('id',new ParseUUIDPipe()) id:string): Promise<User> {
    return this.usersService.findOnebyid(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }  
}
    




  


