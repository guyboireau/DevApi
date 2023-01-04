import { ConflictException,Injectable, NotFoundException, UnauthorizedException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ProjectUser } from '../../entity/project-user.entity';
import { User } from '../../entity/user.entity';
import { ProjectService } from '../../projects/services/project.service';
import { UsersService } from '../../users/services/users.services';


import { CreateProjectUserDto } from '../dto/project-users.dto'

@Injectable()
export class ProjectUserService {
  constructor(
    @InjectRepository(ProjectUser)
    private ProjectUserRepository: Repository<ProjectUser>,
    private projectservice: ProjectService,
    private userservice: UsersService

  ) { }

  async create(CreateProjectUserDto: CreateProjectUserDto, user: User): Promise<ProjectUser> {
    if (user.role === 'Employee') {
      throw new UnauthorizedException('Not Admin or PM')
    }
    else {
      const projectUser = new ProjectUser();
      projectUser.startDate = CreateProjectUserDto.startDate
      projectUser.endDate = CreateProjectUserDto.endDate
      projectUser.projectId = CreateProjectUserDto.projectId
      projectUser.userId = CreateProjectUserDto.userId
      await this.projectservice.findOnebyid(projectUser.projectId);
      await this.userservice.findOnebyid(projectUser.userId);
      const checkdate = await this.ProjectUserRepository.find({
        where: [
          {
            userId: projectUser.userId,
            startDate: Between(projectUser.startDate, projectUser.endDate)
          },
          {
            userId: projectUser.userId,
            endDate: Between(projectUser.startDate, projectUser.endDate)
          },
          {
            userId: projectUser.userId,
            startDate: LessThanOrEqual(projectUser.startDate),
            endDate: MoreThanOrEqual(projectUser.endDate)
          }
        ]
      })
      if (checkdate.length !== 0) {
        throw new ConflictException();
      }
      return this.ProjectUserRepository.save(this.ProjectUserRepository.create(CreateProjectUserDto));

    }
  }

  async findAll(): Promise<ProjectUser[] | undefined> {
    const result = await this.ProjectUserRepository.find();
    if (result) {
      return result;
    }
    throw new NotFoundException('');
  }


  async findOnebyid(id: string): Promise<ProjectUser | undefined> {
    const result = await this.ProjectUserRepository.findOneBy({ id });
    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  async findOne(id: string): Promise<ProjectUser | undefined> {

    return this.ProjectUserRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.ProjectUserRepository.delete(id);
  }

}