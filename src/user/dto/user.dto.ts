import { IsString } from 'class-validator';

export class UserDto {
  @IsString() readonly id: string;

  @IsString() readonly email: string;

  @IsString() readonly username: string;

  @IsString() readonly password: string;

  @IsString() readonly name: string;

  @IsString() readonly surname: string;

  @IsString() readonly token?: string;

}
