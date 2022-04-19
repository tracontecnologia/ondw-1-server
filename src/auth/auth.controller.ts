import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../domain/user/user.entity';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signUp')
  public signUp(@Body() credentialsDto: SignUpCredentialsDto): Promise<User> {
    return this.service.signUp(credentialsDto);
  }

  @Post('/signIn')
  public signIn(
    @Body() credentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.service.signIn(credentialsDto);
  }
}
