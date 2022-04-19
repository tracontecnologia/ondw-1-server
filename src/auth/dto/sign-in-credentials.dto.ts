import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
