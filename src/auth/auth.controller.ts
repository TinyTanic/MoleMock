import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ValidateDto } from './dto/validate.dto';
import { RecaptchaGuard } from './guards/recaptcha.guard';

@Controller('api/auth')
export class AuthController {
  public constructor(private readonly _authService: AuthService) {}

  @Post('login')
  public async login(@Body() credentials: LoginDto) {
    const user = await this._authService.login(
      credentials.username,
      credentials.password,
    );
    if (user) {
      return user;
    } else {
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('signup')
  @UseGuards(RecaptchaGuard)
  public async signup(@Body() user: UserDto): Promise<UserDto> {
    return this._authService.signup(user);
  }

  @Post('signup-test')
  public async signupTest(@Body() user: UserDto): Promise<any> {
    return {};
  }

  @Post('validate')
  public async validate(@Body() toVerify: ValidateDto): Promise<UserDto> {
    return this._authService.validate(toVerify);
  }
}
