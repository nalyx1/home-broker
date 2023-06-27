import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletAssetsService } from './wallet-assets.service';
import { CreateWalletAssetDto } from './dto/create-wallet-asset.dto';
import { UpdateWalletAssetDto } from './dto/update-wallet-asset.dto';

@Controller('wallets/:wallet_id/assets')
export class WalletAssetsController {
  constructor(private readonly walletAssetsService: WalletAssetsService) {}

  @Post()
  create(
    @Param('wallet_id') wallet_id: string,
    @Body() createWalletAssetDto: CreateWalletAssetDto,
  ) {
    return this.walletAssetsService.create({
      wallet_id,
      ...createWalletAssetDto,
    });
  }

  @Get()
  findAll(@Param('wallet_id') wallet_id: string) {
    return this.walletAssetsService.findAll(wallet_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.walletAssetsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWalletAssetDto: UpdateWalletAssetDto,
  ) {
    return this.walletAssetsService.update(id, updateWalletAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletAssetsService.remove(id);
  }
}
