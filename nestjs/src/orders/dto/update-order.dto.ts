import { OrderStatus } from '@prisma/client';

export class UpdateOrderDto {
  partial: number;
  status: OrderStatus;
  broker_transaction_id: string;
  related_investor_id: string;
  negotiated_shares: number;
  price: number;
}
