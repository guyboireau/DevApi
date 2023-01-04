import { MinLength } from "class-validator";

export class CreateProjectDto{
     @MinLength(3)
     name!: string;
     referringEmployeeId!: string; //au format uuidv4
}