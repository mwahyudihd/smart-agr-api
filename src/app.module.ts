import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DhtController } from './sensors-controllers/dht/dht.controller';
import { DhtService } from './sensors-services/dht/dht.service';
import { SoilmoistureService } from './sensors-services/soilmoisture/soilmoisture.service';
import { SoilmoistureController } from './sensors-controllers/soilmoisture/soilmoisture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dht } from './entities/sensors-entities/dht.entity';
import { DeviceController } from './device/device.controller';
import { DeviceService } from './device/device.service';
import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';
import { User } from './entities/user-entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Soil } from './entities/sensors-entities/soil.entity';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "admin",
      password: "adminpass",
      database: "db_smartagr",
      entities: [Dht, User, Soil],
      synchronize: true
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" } //token akan exp setelah 60 detik
    }),
    TypeOrmModule.forFeature([Dht, User, Soil])
  ],
  controllers: [AppController, DhtController, SoilmoistureController, DeviceController, UserController],
  providers: [AppService, DhtService, SoilmoistureService, DeviceService, UserService],
})
export class AppModule {}
