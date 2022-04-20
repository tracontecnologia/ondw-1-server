import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { NFTModule } from '../nft/nft.module';
import { CollectionController } from './collection.controller';
import { Collection } from './collection.entity';
import { CollectionService } from './collection.service';

@Module({
  imports: [TypeOrmModule.forFeature([Collection]), AuthModule, NFTModule],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
