export class ExecuteOrderDto {
  order_id: string;
  status: 'OPEN' | 'CLOSED';
  related_investor_id: string;
  broker_transaction_id: string;
  price: number;
  partial?: number;
  negotiated_shares: number;
}
