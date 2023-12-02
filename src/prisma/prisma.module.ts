import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Export PrismaService to use global. Mean other module can have acess to services exported from prisma module.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
