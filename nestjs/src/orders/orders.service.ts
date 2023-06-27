import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { OrderStatus, OrderType } from '@prisma/client';
import { ExecuteOrderDto } from './dto/execute-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    return this.prismaService.order.create({
      data: {
        ...createOrderDto,
        partial: createOrderDto.shares,
        status: OrderStatus.PENDING,
      },
    });
  }

  async execute(executeOrderDto: ExecuteOrderDto) {
    return this.prismaService.$transaction(async (prisma) => {
      const order = await prisma.order.findFirstOrThrow({
        where: {
          id: executeOrderDto.order_id,
        },
      });
      const partial = order.partial - executeOrderDto.negotiated_shares;
      const updateOrderDto = {
        partial,
        status: executeOrderDto.status,
        broker_transaction_id: executeOrderDto.broker_transaction_id,
        related_investor_id: executeOrderDto.related_investor_id,
        negotiated_shares: executeOrderDto.negotiated_shares,
        price: executeOrderDto.price,
      };
      await this.update(executeOrderDto.order_id, updateOrderDto);
      if (executeOrderDto.status === OrderStatus.CLOSED) {
        await prisma.asset.update({
          where: {
            id: order.asset_id,
          },
          data: {
            price: executeOrderDto.price,
          },
        });
        const walletAsset = await prisma.walletAsset.findUniqueOrThrow({
          where: {
            wallet_id_asset_id: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
            },
          },
        });

        if (walletAsset) {
          const shares =
            order.type === OrderType.BUY
              ? walletAsset.shares + order.shares
              : walletAsset.shares - order.shares;
          await prisma.walletAsset.update({
            where: {
              wallet_id_asset_id: {
                asset_id: order.asset_id,
                wallet_id: order.wallet_id,
              },
            },
            data: {
              shares,
            },
          });
        } else {
          await prisma.walletAsset.create({
            data: {
              asset_id: order.asset_id,
              wallet_id: order.wallet_id,
              shares: executeOrderDto.negotiated_shares,
            },
          });
        }
      }
    });
  }

  findAll(wallet_id: string) {
    return this.prismaService.order.findMany({
      where: {
        wallet_id,
      },
      include: {
        transactions: true,
        asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.order.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        transactions: true,
        asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prismaService.order.update({
      where: {
        id,
      },
      data: {
        partial: updateOrderDto.partial,
        status: updateOrderDto.status,
        transactions: {
          create: {
            broker_transaction_id: updateOrderDto.broker_transaction_id,
            related_investor_id: updateOrderDto.related_investor_id,
            shares: updateOrderDto.negotiated_shares,
            price: updateOrderDto.price,
          },
        },
      },
    });
  }
}
