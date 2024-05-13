import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from './user.repository';

export abstract class UsersService {
  abstract create(createUserDto: CreateUserDto): Promise<any>;

  abstract findAll(): Promise<any>;

  abstract findOneByEmail(email: string): Promise<any>;

  abstract findOneById(id: string): Promise<any>;

  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<any>;

  abstract remove(id: string): Promise<any>;
}

@Injectable()
export class UsersServiceImpl implements UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneByEmail(email);
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOneById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const output = this.usersRepository.update(id, updateUserDto);

    return output;
  }

  async remove(id: string) {
    await this.usersRepository.remove(id);
  }
}
