import { Module } from '@nestjs/common';
import { AuthService, AuthServiceImpl } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository, AuthRepositoryImpl } from './auth.repository';

@Module({
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
