import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IncorrectOldPasswordException } from '../common/utils/errors/IncorrectOldPasswordException.error';
import { dropPassword, hashPassword } from '../common/utils/user.util';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserDto } from './dto/user.dto';
import { User } from './dto/user.entity';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  public async getByUsername(username): Promise<User> {
    const user = await this._userRepository.findOne({ where: { username } });
    return user;
  }

  public async getById(id): Promise<User | null> {
    const user = await this._userRepository.findOne({ where: { id } });
    return user;
  }

  public async addUser(user: UserDto): Promise<UserDto> {
    const newUser = await this._userRepository.save(user);
    return dropPassword(newUser);
  }

  public async getAll() {
    const users = await this._userRepository.find();
    return users.map(dropPassword);
  }

  public async removeById(id): Promise<boolean> {
    const del =  await this._userRepository.delete(id);
    return del.affected > 0;
  }

  public async changePassword(user: UserDto, passwords: ChangePasswordDto) {
    const oldPasswordHashed = hashPassword(passwords.oldPassword);
    if (oldPasswordHashed === user.password) {
      return await this._userRepository.update(
        { id: user.id },
        {
          password: hashPassword(passwords.newPassword),
        },
      );
    } else {
      throw new IncorrectOldPasswordException();
    }
  }
}
