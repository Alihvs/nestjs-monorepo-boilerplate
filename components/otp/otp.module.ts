import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp.service';
import { OTPSchema } from './otp.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'OTP', schema: OTPSchema }])],
    providers: [OtpService],
    exports: [OtpService]
})
export class OtpModule {}
