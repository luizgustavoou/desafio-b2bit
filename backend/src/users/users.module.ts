import { Module } from '@nestjs/common';
import { UsersService, UsersServiceImpl } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRepository, UsersRepositoryImpl } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersRepository,
      useClass: UsersRepositoryImpl,
    },
    {
      provide: UsersService,
      useClass: UsersServiceImpl,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
