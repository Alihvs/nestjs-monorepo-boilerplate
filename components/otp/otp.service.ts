import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOTP } from './otp.interface';

import Agenda from 'agenda';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OtpService {
    agenda: Agenda;
    constructor(
        @InjectModel('OTP') readonly otpModel: Model<IOTP>,
        private readonly configService: ConfigService
    ) {
        const jobDatabaseAddress = `${this.configService.get<string>(
            'MONGO_URI'
        )}/${this.configService.get('JOB_DATABASE_NAME')}`;
        this.agenda = new Agenda({
            db: {
                address: jobDatabaseAddress,
                collection: 'otp',
                options: {
                    useUnifiedTopology: true
                }
            }
        });

        this.agenda.start().then(() => this.defineOtpJob());

        this.agenda.on('complete', (job) => {
            job.remove(function (err) {
                console.log(err);
            });
        });
    }

    private async defineOtpJob() {
        await this.agenda.define('delete otp', async (job: any, done: (error?: Error) => void) => {
            try {
                const { phoneNumber } = job.attrs.data;
                await this.otpModel.findOneAndDelete({ phoneNumber });
            } catch (e) {
                done(e);
            } finally {
                done();
            }
        });
    }

    async createOtpWithTtl(phoneNumber: string, verificationCode: number): Promise<IOTP> {
        await this.agenda.schedule('in 2 minutes', 'delete otp', {
            phoneNumber
        });
        return this.otpModel.create({ phoneNumber, verificationCode });
    }

    async getOtpByPhoneNumber(phoneNumber): Promise<IOTP> {
        return this.otpModel.findOne({ phoneNumber }).lean();
    }

    async getOtpByPhoneNumberAndVerificationCode(params): Promise<IOTP> {
        return this.otpModel.findOne(params).lean();
    }
}
