import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  public async create({ name, email, password, salt }): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      salt,
    });

    return user.save();
  }

  public async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ id });
  }

  public async findUserByNameOrEmail(
    name: string,
    email: string,
  ): Promise<User | null> {
    let user: User = null;

    user = await this.repository.findOne({ name });

    if (!user) user = await this.repository.findOne({ email });

    return user;
  }
}
