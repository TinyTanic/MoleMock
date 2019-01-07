import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { dropPassword } from '../common/utils/user.util';
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

  public async addUser(user: User): Promise<UserDto> {
    const newUser = await this._userRepository.save(user);
    return dropPassword(newUser);
  }

  public async getAll() {
    const users = await this._userRepository.find();
    return users.map(dropPassword);
  }
}
