import { Module } from '@nestjs/common';
import { AccessTokenGuard } from './accessToken.guard';
import { RefreshTokenGuard } from './refreshToken.guard';

@Module({
  providers: [AccessTokenGuard, RefreshTokenGuard],
  exports: [AccessTokenGuard, RefreshTokenGuard],
})
export class GuardsModule {}
