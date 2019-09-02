import { BadRequestException } from '@nestjs/common';
import { ErrorCode } from '.';

export class IncorrectOldPasswordException extends BadRequestException {
  constructor() {
    super(ErrorCode.INCORRECT_OLD_PASSWORD);
  }
}