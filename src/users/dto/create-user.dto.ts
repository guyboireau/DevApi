import { IsEmail, IsIn, IsNotEmpty, IsOptional, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username!: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @IsOptional()
  @IsIn(['Employee', 'Admin', 'ProjectManager'])
  role: string;
}
export class LoginUserDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  password: string;
}
