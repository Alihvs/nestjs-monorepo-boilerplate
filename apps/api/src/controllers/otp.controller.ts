import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Post
} from '@nestjs/common';
import { CustomerService } from '@components/customer/customer.service';
import { OTPLoginDTO, OTPLoginResponseDTO, OTPVerifyDTO } from '@components/otp/otp.dto';
import { OtpService } from '@components/otp/otp.service';
import {
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiTooManyRequestsResponse
} from '@nestjs/swagger';
import { randomVerificationNumber } from '@shared/utils/string';

@ApiTags('API: OTP')
@Controller()
export class OtpController {
    constructor(
        private readonly otpService: OtpService,
        private readonly customerService: CustomerService
    ) {}
    @Post('v1/otp')
    //#region
    @ApiOperation({
        summary: 'Receives a phone number and sends an SMS containing a 5 digit OTP.'
    })
    @ApiResponse({
        type: OTPLoginResponseDTO,
        status: 201,
        description: 'The verification code sms was sent to the user.'
    })
    @ApiTooManyRequestsResponse({
        description:
            'The verification code has already been sent to this phone number and cannot be sent again for 2 minutes.'
    })
    async otpLogin(@Body() { phoneNumber }: OTPLoginDTO) {
        const oldOtp = await this.otpService.getOtpByPhoneNumber(phoneNumber);
        if (oldOtp) {
            throw new HttpException(
                { statusCode: HttpStatus.TOO_MANY_REQUESTS },
                HttpStatus.TOO_MANY_REQUESTS
            );
        }

        const newOtp = await this.otpService.createOtpWithTtl(
            phoneNumber,
            randomVerificationNumber()
        );

        // Send sms

        return { message: 'Verification code sent' };
    }
    //#endregion

    @Post('v1/otp/verify')
    //#region
    @ApiOperation({
        summary:
            'Receives the previously sent phone number and verificationCode and sends back an access token'
    })
    @ApiNotFoundResponse({
        description:
            "There was no OTP found with the provided params. Either it's wrong or it has been expired "
    })
    async otpVerify(@Body() params: OTPVerifyDTO) {
        const otp = await this.otpService.getOtpByPhoneNumberAndVerificationCode(params);
        if (!otp) {
            throw new HttpException({ statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        }

        const user = await this.customerService.createOrGetCustomer(params.phoneNumber);

        return user;

        // if (!user) {
        //     throw new InternalServerErrorException();
        // }
    }
    //#endregion
}
