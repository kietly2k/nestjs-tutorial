import {
  ForbiddenException,
  Injectable,
  Res,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export default class AuthService {
  constructor(
    private prismaService: PrismaService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      // hash password
      const hash = await argon.hash(dto.password);
      // create password using prisma
      const user =
        await this.prismaService.user.create({
          data: {
            email: dto.email,
            hash: hash,
          },
        });

      delete user.hash;
      // return saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }

      throw error;
    }
  }

  signin() {
    return 'This is sign in';
  }
}
