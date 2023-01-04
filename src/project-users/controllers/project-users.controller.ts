import {  Body,Controller,Get,Param,ParseUUIDPipe,Post,Req,UseGuards} from '@nestjs/common';
import { CreateProjectUserDto } from '../dto/project-users.dto';
import { ProjectUserService } from '../services/project-users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ProjectUser } from '../../entity/project-user.entity';
import { CreateProjectDto } from '../../projects/dto/project.dto';


@Controller('project-users')
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService,
  ) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() CreateProjectUserDto: CreateProjectUserDto, @Req() req): Promise<ProjectUser> {
    return this.projectUserService.create(CreateProjectUserDto, req.user);

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProject(@Req() req): Promise<ProjectUser[]> {
    return await this.projectUserService.findAll();

  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneByid(@Param('id', new ParseUUIDPipe()) id: string): Promise<ProjectUser> {
    return this.projectUserService.findOnebyid(id);
  }


}











