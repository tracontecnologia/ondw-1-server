import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { NFT } from './nft.entity';
import { NFTService } from './nft.service';

@Module({
  imports: [TypeOrmModule.forFeature([NFT]), AuthModule],
  providers: [NFTService],
  exports: [NFTService],
})
export class NFTModule {}
