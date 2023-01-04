import { Controller, Get, Inject, Injectable, NotFoundException, Optional, Post, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsEmail } from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import {CreateUserDto} from '../dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.role = createUserDto.role;
    user.email = createUserDto.email;
    user.password=createUserDto.password   

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOnebyid(id: string): Promise<User> {
    const result= await this.usersRepository.findOneBy({id});
    if (result) {
      return result;
    }
    throw new NotFoundException();   
  }
  async findOne(email: string): Promise<User|undefined> {

    const result= await this.usersRepository.findOneBy({email});
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }
  

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}



