import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletAssetDto } from './create-wallet-asset.dto';

export class UpdateWalletAssetDto extends PartialType(CreateWalletAssetDto) {}
