import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/collection.create.dto';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly repository: Repository<Collection>,
  ) {}

  public async create(
    createDto: CreateCollectionDto,
    loggedUser: User,
  ): Promise<Collection | null> {
    const { name } = createDto;

    const collection = this.repository.create({
      name,
      owner: loggedUser,
    });

    await collection.save();

    delete collection.owner;

    return collection;
  }
}
