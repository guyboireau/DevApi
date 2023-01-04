import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Event } from '../../entity/Event.entity';
import { User } from '../../entity/user.entity';
import { CreateEventDto } from '../../Events/dto/events.dto';



@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private EventRepository: Repository<Event>,
    ) { }

    async create(CreateEventDto: CreateEventDto, user: User): Promise<Event> {
        const event = new Event();
        event.date = CreateEventDto.date
        event.eventType = CreateEventDto.eventType
        event.eventDescription = CreateEventDto.eventDescription
        event.userId = user.id
        if (user.role === 'Employee' && event.eventType === 'PaidLeave') {
            event.eventStatus = 'Pending'
            console.log(event)
        }
        else {
            event.eventStatus = 'Accepted'
        }
        return this.EventRepository.save(event);
    }

    async findAll(): Promise<Event[] | undefined> {
        const result = await this.EventRepository.find();
        if (result) {
            return result;
        }
        throw new NotFoundException('');
    }


    async findOnebyid(id: string): Promise<Event | undefined> {
        const result = await this.EventRepository.findOneBy({ id });
        if (result) {
            return result;
        }
        throw new NotFoundException();
    }

    async findOne(id: string): Promise<Event | undefined> {

        return this.EventRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<void> {
        await this.EventRepository.delete(id);
    }

}