import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModuleLib } from '@app/modules/users/users.module';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { GuardsModule } from '@app/guards';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    UsersModuleLib,
    GuardsModule,
    BullModule.registerQueue({
      name: 'send-mail',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
