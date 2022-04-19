import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/collection.create.dto';
import { UpdateCollectionDto } from './dto/collection.update.dto';

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
      author: loggedUser,
    });

    await collection.save();

    delete collection.author;

    return collection;
  }

  public async update(
    id: string,
    updateDto: UpdateCollectionDto,
  ): Promise<Collection | null> {
    const { name } = updateDto;

    const collection = await this.findById(id);
    if (!collection)
      throw new BadRequestException("There's no Collection with given ID");

    const collectionWithSameName = await this.findByAuthorAndName(
      collection.author,
      name,
    );
    if (collectionWithSameName)
      throw new BadRequestException(
        "There's already another Collection with the same given name",
      );

    collection.name = name;

    await collection.save();

    return collection;
  }

  private async findById(id: string): Promise<Collection | null> {
    const collection = await this.repository.findOne({ id });

    return collection;
  }

  private async findByAuthorAndName(
    author: User,
    name: string,
  ): Promise<Collection | null> {
    const collection = await this.repository.findOne({ name, author });

    return collection;
  }
}
