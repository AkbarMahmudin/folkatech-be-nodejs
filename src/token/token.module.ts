import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/libs/db/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '10m' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService, PrismaService],
})
export class TokenModule {}
