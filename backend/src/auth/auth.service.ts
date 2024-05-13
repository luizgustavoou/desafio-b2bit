import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { SessionsService } from '../sessions/sessions.service';
import { RefreshDto } from './dto/refresh.dto';
import { UserProfile } from 'src/users/types/userProfile';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sessionsService: SessionsService,
  ) {}

  async validateUser(email: string, pass: string) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const { password, sessions, ...userProfile } = user;

    if (password !== pass) throw new UnauthorizedException('Senha incorreta');

    const { accessToken, refreshToken } =
      await this.genareteTokens(userProfile);

    this.sessionsService.create({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userId: user.id,
    });

    return { accessToken, refreshToken };
  }

  async signUp(signUpDto: SignUpDto) {
    const result = await this.usersService.findOneByEmail(signUpDto.email);

    if (result) throw new ConflictException('E-mail já utilizado.');

    const user = await this.usersService.create(signUpDto);

    return user;
  }

  async refreshTokens(refreshDto: RefreshDto) {
    const session = await this.sessionsService.findOneByUserIdAndRefreshToken(
      refreshDto.userId,
      refreshDto.refresh_token,
    );

    if (!session) throw new UnauthorizedException('Sessão não encontrada');

    const { password, sessions, ...userProfile } = session.user;

    const { accessToken, refreshToken } =
      await this.genareteTokens(userProfile);

    await this.sessionsService.update(session.id, {
      accessToken,
      refreshToken,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findOneById(userId);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  private async genareteTokens(user: UserProfile) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      avatarURL: user.avatarURL,
      about: user.about,
    };

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, { expiresIn: '24h' }),
      await this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }
}
