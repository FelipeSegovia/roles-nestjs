import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;
}
