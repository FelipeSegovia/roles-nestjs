import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SigninDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  signUp(@Body() user: SignupDto) {
    return this.authService.signup(user);
  }

  @Get('validate/:token')
  async validateToken(@Param('token') verify: string) {
    const validateToken = await this.authService.validateToken(verify);
    return { validateToken };
  }
}
