import { HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RecaptchaGuard } from './guards/recaptcha.guard';
import { JwtStrategy } from './jwt.strategy';
import env from '../scripts/env';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: env.JWT_TIME_EXPIRE,
      },
    }),
    UserModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RecaptchaGuard],
})
export class AuthModule {}
