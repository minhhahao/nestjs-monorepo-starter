import { Controller, Get, UseGuards, Req, Body, Patch } from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from '@app/modules/users/dto/update-user.dto';
import { AccessTokenGuard } from '@app/guards';
import { UsersService } from '@app/modules/users';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  findOne(@Req() req: Request) {
    return this.usersService.findOne(req.user['sub']);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('me')
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user['sub'], updateUserDto);
  }
}
