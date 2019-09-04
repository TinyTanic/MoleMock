import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  HttpService,
} from '@nestjs/common';
import env from '../../scripts/env';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly _httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    if (!headers.recaptcha) {
      throw new BadRequestException('no recaptcha code provided');
    }

    const { RECAPTCHA_URL } = env;

    const verificationUrl = String(RECAPTCHA_URL)
      .replace('{secret}', env.RECAPTCHA_KEY)
      .replace('{response}', headers.recaptcha);

    const { data } = await this._httpService.post(verificationUrl).toPromise();

    return data.success;
  }
}
