import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ValidateDto } from './dto/validate.dto';

@Controller('api/auth')
export class AuthController {

  public constructor(
    private readonly _authService: AuthService,
  ) {}

  @Post('login')
  public async login(@Body() credentials: LoginDto) {
    const user = await this._authService.login(credentials.username, credentials.password);
    if (user) {
      return user;
    } else {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('signup')
  public async signup(@Body() user: UserDto): Promise<UserDto> {
    return this._authService.signup(user);
  }

  @Post('validate')
  public async validate(@Body() toVerify: ValidateDto): Promise<UserDto> {
    return this._authService.validate(toVerify);
  }

}
