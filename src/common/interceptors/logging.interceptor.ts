import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    return call$.pipe(
      tap(() =>
        // tslint:disable-next-line:no-console
        console.log(
          `${request.method} | ${request.route.path} - ${Date.now() - now}ms`,
        ),
      ),
    );
  }
}
