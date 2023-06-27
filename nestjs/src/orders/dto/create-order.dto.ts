import { OrderStatus, OrderType } from '@prisma/client';

export class CreateOrderDto {
  wallet_id: string;
  asset_id: string;
  price: number;
  partial?: number;
  shares: number;
  type: OrderType;
  status?: OrderStatus;
}
