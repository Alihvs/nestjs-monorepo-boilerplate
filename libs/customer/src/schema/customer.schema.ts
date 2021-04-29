import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, index: true },
        phoneNumber: { type: String, index: true }
    },
    { timestamps: true }
);
