import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private prismaService: PrismaService) {}

  create(createWalletDto: CreateWalletDto) {
    return this.prismaService.wallet.create({
      data: createWalletDto,
    });
  }
  findAll() {
    return this.prismaService.wallet.findMany();
  }

  findOne(id: string) {
    return this.prismaService.wallet.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updateAssetDto: UpdateWalletDto) {
    return this.prismaService.wallet.update({
      where: {
        id,
      },
      data: updateAssetDto,
    });
  }

  remove(id: string) {
    return this.prismaService.wallet.delete({
      where: {
        id,
      },
    });
  }
}
