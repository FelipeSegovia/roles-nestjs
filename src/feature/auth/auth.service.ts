import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password: pass }: SigninDto): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.firstName };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(user: SignupDto): Promise<any> {
    const userEncript = {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    };

    await this.userService.create(userEncript);

    return await this.signIn({
      email: user.email,
      password: user.password,
    });
  }

  async validateToken(token: string) {
    try {
      const verifyToken = await this.jwtService.verify(token);
      return Object.keys(verifyToken).length > 0;
    } catch {
      return false;
    }
  }
}
