import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../collection/collection.entity';
import { User } from '../user/user.entity';
import { CreateNFTDto } from './dto/nft.create.dto';
import { GetNFTDto } from './dto/nft.get.dto';
import { NFT } from './nft.entity';

@Injectable()
export class NFTService {
  private index: number;

  constructor(
    @InjectRepository(NFT)
    private readonly repository: Repository<NFT>,
  ) {}

  public async create(
    createDto: CreateNFTDto,
    photoPath: string,
    parentCollection: Collection,
  ): Promise<NFT> {
    const hash = this.makeHash((await this.repository.find()).length + 1);

    const { name, price } = createDto;

    const nft = this.repository.create({
      name,
      hash: hash,
      price,
      photoUrl: photoPath,
      parentCollection,
    });

    return nft.save();
  }

  public async findAll(loggedUser: User): Promise<GetNFTDto[]> {
    const nfts = await this.repository.find();
    const serializedNfts: GetNFTDto[] = [];

    nfts.map((nft) => {
      serializedNfts.push({
        id: nft.id,
        name: nft.name,
        hash: nft.hash,
        price: nft.price,
        photoUrl: nft.photoUrl,
        author: {
          id: nft.parentCollection.author.id,
          name: nft.parentCollection.author.name,
          email: nft.parentCollection.author.email,
        },
        collection: {
          id: nft.parentCollection.id,
          name: nft.parentCollection.name,
        },
        likedByUser: nft.likes.some((user) => user.id === loggedUser.id),
        likes: nft.likes.length,
      });
    });

    return serializedNfts;
  }

  public async delete(id: string): Promise<void> {
    const nft = await this.findById(id);
    if (!nft) throw new BadRequestException("There's no NFT with given ID");

    await nft.remove();
  }

  public async like(id: string, loggedUser: User): Promise<void> {
    const nft = await this.findById(id);
    if (!nft) throw new BadRequestException("There's no NFT with given ID");

    if (nft.likes.some((user) => user.id === loggedUser.id)) {
      nft.likes = nft.likes.filter((user) => user.id !== loggedUser.id);

      await nft.save();

      return;
    }

    nft.likes.push(loggedUser);

    await nft.save();
  }

  private async findById(id: string): Promise<NFT | null> {
    const nft = await this.repository.findOne({ id });

    return nft;
  }

  private makeHash(index: number): string {
    const string = '' + index;
    const pad = '0000';

    return pad.substring(0, pad.length - string.length) + string;
  }
}
