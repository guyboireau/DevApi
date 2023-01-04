import { Controller, ForbiddenException, Get, Inject, Injectable, NotFoundException, Optional, Post, Res, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsEmail, IsEmpty, isValidationOptions, Validate } from 'class-validator';
import { use } from 'passport';
import { generate } from 'rxjs';
import { Repository } from 'typeorm';
import { Project } from '../../entity/project.entity';
import { User } from '../../entity/user.entity';
import { ProjectUserService } from '../../project-users/services/project-users.service';
import { UsersService } from '../../users/services/users.services';

import { CreateProjectDto } from '../dto/project.dto'

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private userservice: UsersService,
  ) { }

  async create(CreateProjectDto: CreateProjectDto, role: string): Promise<Project> {
    if (role !== 'Admin') {
      throw new UnauthorizedException('You are not admin')
    }
    const project = new Project();
    project.name = CreateProjectDto.name
    project.referringEmployeeId = CreateProjectDto.referringEmployeeId
    const referringEmployee = await this.userservice.findOnebyid(project.referringEmployeeId);
    if (referringEmployee.role === 'Employee') {
      throw new UnauthorizedException('Referring employee must be at least PM')
    }
    return this.projectRepository.save(this.projectRepository.create(CreateProjectDto));
  }

  async getAllProject(CreateProjectDto: CreateProjectDto, role, id): Promise<Project[]> {
    if (role === 'Admin' || role === 'ProjectManager') {
      return this.projectRepository.find();
    }
    else {
      const result = await this.projectRepository.findBy(role);
      if (result) {
        return result;
      }

    }
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOnebyid(id: string): Promise<Project | undefined> {
    const result = await this.projectRepository.findOneBy({ id });
    if (result) {
       //if (projectuser.userid !== result.referringEmployeeId) { throw new ForbiddenException("user not in the project with user role") }
      return result;
    }
    throw new NotFoundException();
  }

  async findOne(id: string): Promise<Project | undefined> {

    return this.projectRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }

}