import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetLoggedUser } from 'src/auth/decorators/get-logged-user.decorator';
import assetsConfig from 'src/config/assets.config';
import { CreateNFTDto } from '../nft/dto/nft.create.dto';
import { NFT } from '../nft/nft.entity';
import { User } from '../user/user.entity';

import { Collection } from './collection.entity';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/collection.create.dto';

@Controller('collections')
@UseGuards(AuthGuard())
export class CollectionController {
  constructor(private readonly service: CollectionService) {}

  @Post()
  public async create(
    @Body() createDto: CreateCollectionDto,
    @GetLoggedUser() user: User,
  ): Promise<Collection | null> {
    return this.service.create(createDto, user);
  }

  @Post('/:id/nfts')
  @UseInterceptors(FileInterceptor('photo', assetsConfig('photos')))
  public async createNFT(
    @Param('id') id: string,
    @UploadedFile() photo: Express.Multer.File,
    @Body() createNFTDto: CreateNFTDto,
  ): Promise<NFT | null> {
    return this.service.createNFT(id, createNFTDto, photo.path);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
