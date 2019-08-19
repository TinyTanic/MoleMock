import * as crypto from 'crypto';

import { User } from '../../user/dto/user.entity';
import { UserDto } from '../../user/dto/user.dto';

export const HASH_ALGORITHM = 'SHA512';

export const dropPassword = (user: UserDto): UserDto => {
  const userNoPassword = { ...user };
  delete userNoPassword.password;
  return userNoPassword;
};

export const hashPassword = (password: string) => {
  return crypto
    .createHash(HASH_ALGORITHM)
    .update(password)
    .digest('hex');
};
