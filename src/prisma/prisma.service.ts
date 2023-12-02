import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(configSvc: ConfigService) {
        // call PrismaClient contructor (like base in c#)
        super({
            datasources: {
                db: {
                    url: configSvc.get('DATABASE_URL')
                }
            }
        })
    }
}
