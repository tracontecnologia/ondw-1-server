import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(180)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
