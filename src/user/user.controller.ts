import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { dropPassword } from '../common/utils/user.util';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  public constructor(private readonly _userService: UserService) {}

  // REMOVE: remove when app completed
  @Get()
  // @UseGuards(JwtAuthGuard)
  public async getAll() {
    const all = await this._userService.getAll();    
    return all;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  public async getMe(@User() user) {
    const findUser = await this._userService.getById(user.id);
    return dropPassword(findUser);
  }
}
