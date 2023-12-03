import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

// @Controller() will response to request '/' which is not recommend because it may have conflict
@Controller('users')
export class UserController {
  // Response to request '/users/me'
  // Use jwt guard with the key defined in jwt.strategy.ts. Default is 'jwt'
  @UseGuards(JwtGuard)
  @Get('me')
  getMe() {
    return 'User Info';
  }
}
