import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const client = req.user;

        if (client && client.admin) {
            return true;
        }

        throw new HttpException(
            'Unauthorized access',
            HttpStatus.UNAUTHORIZED
        );
    }
}
