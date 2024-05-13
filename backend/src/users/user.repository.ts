import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export abstract class UsersRepository {
  abstract create(createUserDto: CreateUserDto): Promise<any>;

  abstract findAll(): Promise<any>;

  abstract findOneByEmail(email: string): Promise<any>;

  abstract findOneById(id: string): Promise<any>;

  abstract update(id: string, updateUserDto: UpdateUserDto): Promise<any>;

  abstract remove(id: string): Promise<any>;
}

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const output = await this.usersRepository.save(createUserDto);
    return output;
  }

  async findAll() {
    const output = await this.usersRepository.find({
      select: ['id', 'email', 'name', 'lastName', 'avatarURL', 'about'],
    });
    return output;
  }

  async findOneByEmail(email: string) {
    const output = await this.usersRepository.findOneBy({ email });
    return output;
  }

  async findOneById(id: string) {
    const output = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'lastName', 'avatarURL'],
    });

    return output;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    this.usersRepository.merge(user, updateUserDto);

    const output = await this.usersRepository.save(user);

    return {
      id: output.id,
      email: output.email,
      name: output.name,
      about: output.about,
      avatarURL: output.avatarURL,
    };
  }

  async remove(id: string) {
    const output = await this.usersRepository.delete(id);
    return output;
  }
}
