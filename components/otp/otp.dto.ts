import { ApiProperty } from '@nestjs/swagger';

export class OTPLoginDTO {
    @ApiProperty({ description: 'Customer phone number' })
    phoneNumber: string;
}

export class OTPLoginResponseDTO {
    @ApiProperty({ description: 'A success or failure message' })
    message: number;
}

export class OTPVerifyDTO {
    @ApiProperty({ description: 'Customer phone number' })
    phoneNumber: string;

    @ApiProperty({ description: 'A 5 digit verification code', example: 69085 })
    verificationCode: number;
}
