import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prismaService: PrismaService) {}

  create(createAssetDto: CreateAssetDto) {
    return this.prismaService.asset.create({
      data: createAssetDto,
    });
  }

  findAll() {
    return this.prismaService.asset.findMany();
  }

  findOne(id: string) {
    return this.prismaService.asset.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updateAssetDto: UpdateAssetDto) {
    return this.prismaService.asset.update({
      where: {
        id,
      },
      data: updateAssetDto,
    });
  }

  remove(id: string) {
    return this.prismaService.asset.delete({
      where: {
        id,
      },
    });
  }
}
