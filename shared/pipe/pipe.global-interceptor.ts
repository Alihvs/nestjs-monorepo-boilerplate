import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    Injectable
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<any, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError((error) => {
                    const _error = new HttpException(
                        {
                            status_code: error.response?.statusCode || 500,
                            data: {
                                message: error.response?.message || 'unknown error',
                                error: error.response?.error
                            }
                        },
                        error.response?.statusCode
                    );
                    return throwError(_error);
                })
            )
            .pipe(
                map((data) => {
                    const response = context.switchToHttp().getResponse();
                    const _data = typeof data === 'string' ? { message: data } : data;
                    return {
                        status_code: response.statusCode,
                        data: _data
                    };
                })
            );
    }
}
