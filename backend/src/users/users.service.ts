import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findAll() {
    const users = await this.usersRepository.find({
      select: ['id', 'email', 'name', 'avatarURL', 'about'],
    });
    return users;
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'avatarURL'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    this.usersRepository.merge(user, updateUserDto);

    const userUpdated = await this.usersRepository.save(user);

    return {
      id: userUpdated.id,
      email: userUpdated.email,
      name: userUpdated.name,
      about: userUpdated.about,
      avatarURL: userUpdated.avatarURL,
    };
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}
