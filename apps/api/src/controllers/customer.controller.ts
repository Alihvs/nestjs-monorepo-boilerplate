import { CustomerService } from '@components/customer/customer.service';
import { CreateCustomerDTO } from '@components/customer/customer.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('API: Customer')
@Controller()
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get('v1/customer/:id')
    @ApiParam({ name: 'id', type: String })
    @ApiOperation({
        summary: 'Returns a user by id.'
    })
    async getACustomer(@Param() { id }) {
        return this.customerService.getUserById(id);
    }

    @Post('v1/customer')
    @ApiOperation({
        summary: 'Creates a test customer.'
    })
    async getAllSystemVariables(@Body() customer: CreateCustomerDTO) {
        console.log(customer);
        return this.customerService.createOrGetCustomer(customer.phoneNumber);
    }
}
