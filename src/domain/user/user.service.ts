import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

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
    return this.repository.findUserByNameOrEmail(name, email);
  }

  public async findUserByNameOrEmailForLogin(
    name: string,
    email: string,
  ): Promise<User | null> {
    return this.repository.findUserByNameOrEmailForLogin(name, email);
  }
}
