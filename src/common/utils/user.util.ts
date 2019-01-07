import * as crypto from 'crypto';

import { User } from '../../user/dto/user.entity';

export const HASH_ALGORITHM = 'SHA512';

export const dropPassword = (user: User) => {
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