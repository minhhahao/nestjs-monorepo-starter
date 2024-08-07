import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@app/modules/users/dto/create-user.dto';
import {
  RefreshResponse,
  SignInResponse,
  SignUpResponse,
} from './auth.interfaces';
import { SignInDto } from './auth.dto';
import { AccessTokenGuard, RefreshTokenGuard } from '@app/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<SignUpResponse> {
    return await this.authService.create(createUserDto);
  }

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    return await this.authService.signIn(signInDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/sign-out')
  async signOut(@Req() req: Request): Promise<SignUpResponse> {
    return await this.authService.signOut(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refresh(@Req() req: Request): Promise<RefreshResponse> {
    console.log('req.user', req.user);
    return await this.authService.refresh(
      req.user['sub'],
      req.user['refreshToken'],
    );
  }
}
