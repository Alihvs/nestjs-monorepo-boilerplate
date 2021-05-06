import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './customer.schema';
import { CustomerService } from './customer.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])],
    providers: [CustomerService],
    exports: [CustomerService]
})
export class CustomerModule {}
