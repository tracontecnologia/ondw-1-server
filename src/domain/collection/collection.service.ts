import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNFTDto } from '../nft/dto/nft.create.dto';
import { NFT } from '../nft/nft.entity';
import { NFTService } from '../nft/nft.service';
import { User } from '../user/user.entity';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/collection.create.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly repository: Repository<Collection>,
    private readonly nftService: NFTService,
  ) {}

  public async create(
    createDto: CreateCollectionDto,
    loggedUser: User,
  ): Promise<Collection | null> {
    const { name } = createDto;

    const collection = this.repository.create({
      name,
      author: loggedUser,
    });

    await collection.save();

    delete collection.author;

    return collection;
  }

  public async createNFT(
    collectionId: string,
    createNFTDto: CreateNFTDto,
    photoPath: string,
  ): Promise<NFT | null> {
    const collection = await this.repository.findOne({ id: collectionId });
    if (!collection)
      throw new BadRequestException("There's no Collection with given ID");

    const nft = await this.nftService.create(
      createNFTDto,
      photoPath,
      collection,
    );

    return nft;
  }

  public async delete(id: string): Promise<void> {
    const collection = await this.findById(id);
    if (!collection)
      throw new BadRequestException("There's no Collection with given ID");

    await collection.remove();
  }

  private async findById(id: string): Promise<Collection | null> {
    const collection = await this.repository.findOne({ id });

    return collection;
  }
}
