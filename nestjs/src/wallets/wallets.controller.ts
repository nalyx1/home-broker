import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createAssetDto: CreateWalletDto) {
    return this.walletsService.create(createAssetDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.walletsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateWalletDto) {
    return this.walletsService.update(id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(id);
  }
}
