export class CreateProjectUserDto {
     id!: string; //au format uuidv4
     startDate!: Date; 
     endDate!: Date; 
     projectId!: string; //au format uuidv4
     userId!: string; //au format uuidv4
}
