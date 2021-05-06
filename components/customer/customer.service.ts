import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDTO } from './customer.dto';
import { ICustomer } from './customer.interface';
@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') readonly customerModel: Model<ICustomer>) {}

    async getUserById(id: string): Promise<ICustomer> {
        return await this.customerModel.findById(id);
    }

    async createOrGetCustomer(phoneNumber: string): Promise<ICustomer> {
        const customer = await this.customerModel.findOne({ phoneNumber });
        if (customer) return customer;
        return this.customerModel.create({ phoneNumber });
    }
}
