import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('collections')
export class Collection extends CustomBaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @ManyToOne(() => User, (user: User) => user.collections, { nullable: false })
  owner: User;
}
