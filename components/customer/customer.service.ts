import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './customer.dto';
import { ICustomer } from './customer.interface';
@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') readonly customerModel: Model<ICustomer>) {}

    async getUserById(id: string): Promise<ICustomer> {
        return await this.customerModel.findById(id);
    }

    async createTestUser(customer: CreateCustomerDto): Promise<ICustomer> {
        return this.customerModel.create(customer);
    }
}
