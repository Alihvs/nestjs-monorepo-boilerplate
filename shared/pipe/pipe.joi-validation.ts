import {
    PipeTransform,
    Injectable,
    BadRequestException
} from '@nestjs/common';

@Injectable()
export class PipeJoiValidation implements PipeTransform {
    constructor(private readonly schema: any) {}

    transform(value: any) {
        const { error } = this.schema.validate(value);
        if (error) {
            const message = 'Validation failed';
            const fields = error.details.map((e) => e.message);
            throw new BadRequestException(message, fields);
        }
        return value;
    }
}
