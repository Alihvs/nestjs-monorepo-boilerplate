import * as mongoose from 'mongoose';

export const OTPSchema = new mongoose.Schema(
    {
        phoneNumber: { type: String, index: true, unique: true },
        verificationCode: Number
        // createdAt: { type: Date, expires: '5m', default: Date.now }
    },
    { timestamps: true }
);
