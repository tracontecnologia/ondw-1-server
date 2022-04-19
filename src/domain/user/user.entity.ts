import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Collection } from '../collection/collection.entity';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, type: 'varchar' })
  salt: string;

  @OneToMany(() => Collection, (collection: Collection) => collection.owner, {
    nullable: true,
  })
  collections: Collection[];
}
