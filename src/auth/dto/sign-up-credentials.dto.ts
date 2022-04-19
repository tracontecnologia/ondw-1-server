import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignUpCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(180)
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
