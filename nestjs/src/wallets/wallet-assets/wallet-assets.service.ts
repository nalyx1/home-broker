import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';
import { UpdateWalletAssetDto } from './dto/update-wallet-asset.dto';

@Injectable()
export class WalletAssetsService {
  constructor(private prismaService: PrismaService) {}

  create(createWalletAssetDto: CreateWalletAssetDto) {
    return this.prismaService.walletAsset.create({
      data: createWalletAssetDto,
    });
  }

  findAll(wallet_id: string) {
    return this.prismaService.walletAsset.findMany({
      where: {
        wallet_id,
      },
      include: {
        asset: {
          select: {
            id: true,
            symbol: true,
            price: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.walletAsset.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        asset: {
          select: {
            id: true,
            symbol: true,
            price: true,
          },
        },
      },
    });
  }

  update(id: string, updateWalletAssetDto: UpdateWalletAssetDto) {
    return this.prismaService.walletAsset.update({
      where: {
        id,
      },
      data: updateWalletAssetDto,
    });
  }

  remove(id: string) {
    return this.prismaService.walletAsset.delete({
      where: {
        id,
      },
    });
  }
}
