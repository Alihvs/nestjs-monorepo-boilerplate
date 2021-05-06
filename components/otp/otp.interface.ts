import { Document } from 'mongoose';

export interface IOTP extends Document {
    phoneNumber: string;
    verificationCode: number;
}
