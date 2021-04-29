import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
    constructor(
        @InjectSentry() private readonly sentry: SentryService
    ) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<any> {
        return next.handle().pipe(
            tap(null, (exception) => {
                this.sentry.instance().captureException(exception);
            })
        );
    }
}
