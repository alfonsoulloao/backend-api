
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginInput } from './model/input/loginInput';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AppService) {
    super();
  }

  // async validate(input: LoginInput): Promise<any> {
  //   const user = await this.authService.validateUser(input);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}