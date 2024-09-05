import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { PrismaService } from 'src/libs/db/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, PrismaService, JwtService],
})
export class VehicleModule {}
