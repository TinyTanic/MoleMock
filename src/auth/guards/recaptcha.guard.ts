import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  HttpService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(
    private readonly _httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    if (!headers.recaptcha) {
      throw new BadRequestException('no recaptcha code provided');
    }

    const recaptchaUrl = this.configService.get('RECAPTCHA_URL');

    const verificationUrl = String(recaptchaUrl)
      .replace('{secret}', recaptchaUrl)
      .replace('{response}', headers.recaptcha);

    const { data } = await this._httpService.post(verificationUrl).toPromise();

    return data.success;
  }
}
