import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as uuidv4 from 'uuid/v4';

import { dropPassword, hashPassword } from '../common/utils/user.util';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/dto/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './dto/jwt-payload.interface';
import { ValidateDto } from './dto/validate.dto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  public async login(username, password): Promise<UserDto> {
    const user = await this._userService.getByUsername(username);
    if (user && user.password === hashPassword(password)) {
      return {
        ...dropPassword(user),
        token: await this.createToken(user),
      };
    }
    return null;
  }

  public async signup(user: UserDto) {
    const freeUsername = await this._userService.getByUsername(user.username);

    if (freeUsername) {
      throw new UnauthorizedException();
    }

    const newUser = {
      ...user,
      id: uuidv4(),
      password: hashPassword(user.password),
    };

    return this._userService.addUser(newUser);
  }

  public async validate(payload: ValidateDto): Promise<UserDto> {
    const { token } = payload;
    if (!token) {
      throw new BadRequestException();
    }
    try {
      const { id } = await this._jwtService.verify(token);
      const user = await this._userService.getById(id);
      const newToken = await this.createToken(user);
      return { ...dropPassword(user), token: newToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  public async createToken(user: User): Promise<string> {
    const payload: JwtPayload = { username: user.username, id: user.id };
    const accessToken = this._jwtService.sign(payload);
    return accessToken;
  }
}
