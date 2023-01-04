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
import { CreateProjectDto } from '../dto/project.dto';
import { ProjectService } from '../services/project.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.services';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Project } from '../../entity/project.entity';


@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService,
    private authService: AuthService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() CreateProjectDto: CreateProjectDto, @Req() req) {
    return this.projectService.create(CreateProjectDto, req.user.role);

  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProject(CreateProjectDto: CreateProjectDto, @Req() req): Promise<Project[]> {
    return await this.projectService.getAllProject(CreateProjectDto, req.user.role, req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneByid(@Param('id', new ParseUUIDPipe()) id: string): Promise<Project> {
    return this.projectService.findOnebyid(id);
  }

}











