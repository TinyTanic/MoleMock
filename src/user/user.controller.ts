import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { dropPassword } from '../common/utils/user.util';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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
  public async getMe(@User() user: UserDto) {
    const findUser = await this._userService.getById(user.id);
    return dropPassword(findUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async removeUser(@User() user: UserDto, @Param('id') userId) {
    const affected = await this._userService.removeById(userId);
    if (!affected) {
      throw new NotFoundException('user not found');
    }
  }

  @Put('changepassword')
  @UseGuards(JwtAuthGuard)
  public async editPassword(
    @User() user: UserDto,
    @Body() passwords: ChangePasswordDto,
  ) {
    return await this._userService.changePassword(user, passwords);
  }
}
