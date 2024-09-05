import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { RedisModule } from './libs/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    TokenModule,
    VehicleModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
