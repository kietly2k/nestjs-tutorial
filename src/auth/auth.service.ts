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
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthService {
  constructor(
    private prismaService: PrismaService,
    private configSvc: ConfigService,
    private jwtSvc: JwtService,
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

      // send back signed jwt token to the user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }

      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find user by email
    // findFirst allow to find any field
    // findUnique only find unique field
    const user =
      await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Email incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );

    // if incorrect then throw exception
    if (pwMatches == false)
      throw new ForbiddenException(
        'Password incorrect',
      );

    // send back signed jwt token to the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    // Get secret from env to sign the jwt. When user sign in with jwt code we know that hash code below to our system to authorize
    const secret =
      this.configSvc.get('JWT_SECRET');

    // Set expire time 15 minutes and secret key
    const token = await this.jwtSvc.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}
