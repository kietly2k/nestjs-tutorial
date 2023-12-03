import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

// Use jwt guard with the key defined in jwt.strategy.ts. Default is 'jwt'
@UseGuards(JwtGuard)
// @Controller() will response to request '/' which is not recommend because it may have conflict
@Controller('users')
export class UserController {
  // Response to request '/users/me'
  // Decorator receive the request in @GetUser Param then return result mapped to user variable
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
