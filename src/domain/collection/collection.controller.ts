import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedUser } from 'src/auth/decorators/get-logged-user.decorator';
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
}
