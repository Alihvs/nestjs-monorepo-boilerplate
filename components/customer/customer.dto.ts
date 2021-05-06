import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDTO {
    @ApiProperty({ name: 'name', type: String })
    name: string;

    @ApiProperty({ name: 'email', type: String })
    email: string;

    @ApiProperty({ name: 'phoneNumber', type: String })
    phoneNumber: string;
}
