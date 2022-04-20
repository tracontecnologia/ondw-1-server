import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetLoggedUser } from 'src/auth/decorators/get-logged-user.decorator';
import { User } from '../user/user.entity';
import { NFTService } from './nft.service';

@Controller('nfts')
@UseGuards(AuthGuard())
export class NFTController {
  constructor(private readonly service: NFTService) {}

  @Post('/:id/likes')
  public async like(
    @Param('id') id: string,
    @GetLoggedUser() user: User,
  ): Promise<void> {
    return this.service.like(id, user);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
