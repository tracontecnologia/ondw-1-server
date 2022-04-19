import { CustomBaseEntity } from 'src/shared/custom-base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column({ nullable: false, type: 'varchar', length: 150 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 180 })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, type: 'varchar' })
  salt: string;
}
