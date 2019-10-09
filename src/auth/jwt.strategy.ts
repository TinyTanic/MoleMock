import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../user/user.service';
import { JwtPayload } from './dto/jwt-payload.interface';
import env from '../scripts/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(private readonly _userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET_KEY,
    });
  }

  public async validate(payload: JwtPayload) {
    const { id } = payload;
    if (!id) {
      throw new UnauthorizedException();
    }
    const user = await this._userService.getById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
