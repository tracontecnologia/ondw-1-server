import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NFTService } from './nft.service';

@Controller('nfts')
@UseGuards(AuthGuard())
export class NFTController {
  constructor(private readonly service: NFTService) {}

  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
