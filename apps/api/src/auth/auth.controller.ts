import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@app/modules/users/dto/create-user.dto';
import { SignInResponse, SignUpResponse } from './auth.interfaces';
import { SignInDto } from './auth.dto';
import { AccessTokenGuard } from '@app/guards';

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
    console.log('req.user', req.headers);
    return await this.authService.signOut(req.user['sub']);
  }
}
