import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Cache } from 'cache-manager';

import { PrismaService } from 'src/libs/db/prisma.service';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    private readonly db: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    await this.db.vehicle.create({
      data: createVehicleDto,
    });

    await this.syncronizeCache();

    return { message: 'Vehicle created successfully' };
  }

  async findAll() {
    const cachedVehicles = await this.cacheManager.get('vehicles');

    // If vehicles are cached, return them from cache
    if (cachedVehicles) {
      return {
        message: 'Vehicles retrieved from cache successfully',
        data: { vehicles: JSON.parse(cachedVehicles as any) },
      };
    }

    // If vehicles are not cached, retrieve them from the database and cache them
    const vehicles = await this.syncronizeCache();

    return {
      message: 'Vehicles retrieved successfully',
      data: { vehicles },
    };
  }

  async findOne(id: string) {
    if (id.length !== 24) throw new BadRequestException('Invalid ID');

    const cachedVehicles = await this.cacheManager.get('vehicles');
    const vehicles = JSON.parse(cachedVehicles as any);

    let vehicle = vehicles.find((vehicle) => vehicle.id === id);

    // If vehicle is found in cache, return it from cache
    if (vehicle) {
      return {
        message: 'Vehicle retrieved from cache successfully',
        data: { vehicle },
      };
    }

    // If vehicle is not found in cache, retrieve it from the database and cache it
    vehicle = await this.db.vehicle.findUnique({
      where: { id },
    });

    // If vehicle is not found in the database, throw an error
    if (!vehicle) throw new NotFoundException('Vehicle not found');

    return {
      message: 'Vehicle retrieved successfully',
      data: { vehicle },
    };
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    await this.findOne(id);

    await this.db.vehicle.update({
      where: { id },
      data: updateVehicleDto,
    });

    // Update the cache
    await this.syncronizeCache();

    return { message: 'Vehicle updated successfully' };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.vehicle.delete({
      where: { id },
    });

    // Update the cache
    await this.syncronizeCache();

    return { message: 'Vehicle deleted successfully' };
  }

  async syncronizeCache() {
    const vehicles = await this.db.vehicle.findMany();

    await this.cacheManager.set('vehicles', JSON.stringify(vehicles));

    return vehicles;
  }
}
