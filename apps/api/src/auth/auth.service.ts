import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { CreateUserDto } from '@app/modules/users/dto/create-user.dto';
import { UsersService } from '@app/modules/users';
import {
  BadRequestException,
  ForbiddenException,
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
    return await this.usersService.update(userId, {
      refreshToken: refreshToken,
    });
  }

  async signOut(userId: number) {
    return await this.usersService.update(userId, {
      refreshToken: null,
    });
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.usersService.findOne(userId, ['password']);
    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
      throw new ForbiddenException('Invalid refresh token');
    }

    // Check if expired refresh token
    const { exp } = this.jwtService.decode(refreshToken) as any;
    if (Date.now() >= exp * 1000) {
      throw new ForbiddenException('Expired refresh token');
    }

    let newAccessTokenExpiresIn = '1h';
    // If the remaining time of the refresh token is less than 1h, then the new access token will expire equal to the remaining time
    if (exp * 1000 - Date.now() < 3600000) {
      newAccessTokenExpiresIn = `${(exp * 1000 - Date.now()) / 1000}s`;
    }

    const newAccessToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        expiresIn: newAccessTokenExpiresIn,
        secret: process.env.JWT_SECRET,
      },
    );
    return { accessToken: newAccessToken };
  }
}
