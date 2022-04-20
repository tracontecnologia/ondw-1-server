import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Collection } from '../collection/collection.entity';

@Entity('nfts')
export class NFT extends CustomBaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  hash: string;

  @Column({ nullable: false, type: 'varchar' })
  photoUrl: string;

  @Column({ nullable: false, type: 'decimal' })
  price: number;

  @ManyToOne(() => Collection, (collection: Collection) => collection.nfts, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  parentCollection: Collection;
}
