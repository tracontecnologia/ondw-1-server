import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignUpCredentialsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
