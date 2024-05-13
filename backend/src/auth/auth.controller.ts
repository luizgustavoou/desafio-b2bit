import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  ValidationPipe,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { RefreshDto } from './dto/refresh.dto';
import { Public } from 'src/decorators/public.decorator';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body(new ValidationPipe()) signInDto: SigninDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('signup')
  async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Get('profile')
  async getProfile(@Req() req: Request) {
    const { sub: userId } = (<any>req).user;

    const output = await this.authService.getProfile(userId);

    return output;
  }

  @Post('refresh')
  async refresh(@Body(new ValidationPipe()) body: RefreshDto) {
    return await this.authService.refreshTokens(body);
  }
}
