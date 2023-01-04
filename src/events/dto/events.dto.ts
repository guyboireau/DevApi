import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class CreateEventDto {
    public date!: Date;
    @IsOptional()
    @IsIn(['Pending' , 'Accepted' , 'Declined'])
    public eventStatus?: string; // valeur par défaut : 'Pending';
    @IsOptional()
    @IsIn(['RemoteWork' , 'PaidLeave'])
    public eventType!: string;
    public eventDescription?: string;
}