import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from '../collection/collection.entity';
import { CreateNFTDto } from './dto/nft.create.dto';
import { NFT } from './nft.entity';

@Injectable()
export class NFTService {
  private index: number;

  constructor(
    @InjectRepository(NFT)
    private readonly repository: Repository<NFT>,
  ) {
    this.index = 1;
  }

  public async create(
    createDto: CreateNFTDto,
    photoPath: string,
    parentCollection: Collection,
  ): Promise<NFT> {
    const hash = this.makeHash();
    this.index++;

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

  public async delete(id: string): Promise<void> {
    const nft = await this.findById(id);
    if (!nft)
      throw new BadRequestException("There's no Collection with given ID");

    await nft.remove();
  }

  private async findById(id: string): Promise<NFT | null> {
    const nft = await this.repository.findOne({ id });

    return nft;
  }

  private makeHash(): string {
    const string = '' + this.index;
    var pad = '0000';

    return pad.substring(0, pad.length - string.length) + string;
  }
}
