import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CreateEventDto } from '../dto/events.dto';
import { EventService } from '../services/events.services';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Event } from '../../entity/Event.entity';



@Controller('events')
export class EventController {
    constructor(private readonly EventService: EventService,
    ) { }


    @UseGuards(JwtAuthGuard)
    @Post()     
    create(@Body() CreateEventDto: CreateEventDto, @Req() req): Promise<Event> {
        return this.EventService.create(CreateEventDto, req.user);

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProject(): Promise<Event[]> {
        return await this.EventService.findAll();

    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOneByid(@Param('id', new ParseUUIDPipe()) id: string): Promise<Event> {
        return this.EventService.findOnebyid(id);
    }


}











