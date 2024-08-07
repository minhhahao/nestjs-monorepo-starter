import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { CreateUserDto } from '@app/modules/users/dto/create-user.dto';
import { UsersService } from '@app/modules/users';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SignInDto } from './auth.dto';
import { ROUNDOFHASH } from '@app/config/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException(
        `User already exists for email: ${createUserDto.email}`,
      );
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, ROUNDOFHASH);
    createUserDto.password = hashPassword;
    const user = await this.usersService.create(createUserDto);
    return omit(user, 'password');
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);
    if (!user) {
      throw new NotFoundException(
        `User not found for email: ${signInDto.email}`,
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const tokens = await this.generateTokens(user.id);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  async generateTokens(userId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          expiresIn: '1h',
          secret: process.env.JWT_SECRET,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          expiresIn: '1d',
          secret: process.env.JWT_SECRET,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async signOut(userId: number) {
    return await this.usersService.update(userId, {
      refreshToken: null,
    });
  }
}
