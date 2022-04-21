import { GetNFTDto } from 'src/domain/nft/dto/nft.get.dto';
import { GetUserDto } from 'src/domain/user/dto/user.get.dto';

export class GetCollectionDto {
  name: string;
  author?: GetUserDto;
  nfts: GetNFTDto[];
  totalLikes: number;
}
