import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/libs/db/prisma.service';

@Injectable()
export class TokenService {
  constructor(private db: PrismaService, private jwtService: JwtService) {}

  async createToken(id: string) {
    if (id.length !== 24) throw new BadRequestException('Invalid ID');

    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) throw new UnauthorizedException('Unauthorized');

    const payload = { sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
