import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    configSvc: ConfigService,
    private prismaSvc: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configSvc.get('JWT_SECRET'),
    });
  }

  // Receive jwt token. Parse it do something with the data.
  // Validate then return data append to user property in request object (Express)
  async validate(payload: any) {
    console.log("Get in strategy");
    const user = await this.prismaSvc.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if(user)
      delete user.hash;
    // If does not find user then return null. Return null will return 401 unauthorize
    return user;
  }
}
