import { IsString } from 'class-validator';

export class ValidateDto {
  @IsString() readonly token: string;
}
