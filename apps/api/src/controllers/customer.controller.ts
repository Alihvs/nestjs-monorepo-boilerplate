import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from 'components/customer/customer.dto';
import { CustomerService } from 'components/customer/customer.service';

@ApiTags('API: Customer')
@Controller()
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get('/api/v1/customer/:id')
    @ApiParam({ name: 'id', type: String })
    @ApiOperation({
        summary: 'Returns a user by id.'
    })
    async getACustomer(@Param() { id }) {
        return this.customerService.getUserById(id);
    }

    @Post('/api/v1/customer')
    @ApiOperation({
        summary: 'Creates a test customer.'
    })
    async getAllSystemVariables(@Body() customer: CreateCustomerDto) {
        console.log(customer);
        return this.customerService.createTestUser(customer);
    }
}
