import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/libs/db/prisma.service';

@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.db.user.create({
      data: createUserDto,
    });

    return {
      message: 'User created successfully',
      data: {
        user,
      },
    };
  }

  async findAll() {
    const users = await this.db.user.findMany();

    return {
      message: 'Users retrieved successfully',
      data: { users },
    };
  }

  async findOne(id: string) {
    if (id.length !== 24) throw new BadRequestException('Invalid ID');

    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User retrieved successfully',
      data: { user },
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    await this.db.user.update({
      where: { id },
      data: updateUserDto,
    });

    return {
      message: 'User updated successfully',
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.db.user.delete({
      where: { id },
    });

    return {
      message: 'User deleted successfully',
    };
  }

  async findByAccountNumber(accountNumber: string) {
    const user = await this.db.user.findUnique({
      where: { accountNumber },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User retrieved successfully',
      data: { user },
    };
  }

  async findByIdentityNumber(identityNumber: string) {
    const user = await this.db.user.findUnique({
      where: { identityNumber },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User retrieved successfully',
      data: { user },
    };
  }
}
