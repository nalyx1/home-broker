import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ExecuteOrderDto } from './dto/execute-order.dto';

@Controller('wallets/:wallet_id/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Param() param: { wallet_id: string },
    @Body() createOrderDto: CreateOrderDto,
  ) {
    createOrderDto.wallet_id = param.wallet_id;
    return this.ordersService.create(createOrderDto);
  }

  @Post('execute')
  execute(@Body() body: ExecuteOrderDto) {
    return this.ordersService.execute(body);
  }

  @Get()
  findAll(@Param() param: { wallet_id: string }) {
    const id = param.wallet_id;
    return this.ordersService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
