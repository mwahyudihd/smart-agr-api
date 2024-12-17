import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user-entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    async getDeviceByUsername(username: string) {
        const user = await this.userRepository.findOne({
          where: { username },
          select: ['device', 'pumpMode', 'firstTime', 'secondTime'],
        });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
    }
    
    async updateDeviceCode(username: string, newDeviceCode: string) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const existingDevice = await this.userRepository.findOne({ where: { device: newDeviceCode } });
        if (existingDevice) {
          throw new ConflictException('Device code is already in use');
        }
    
        user.device = newDeviceCode;
        await this.userRepository.save(user);
    
        return { message: 'Device code updated successfully' };
    }

    async getPumpModeByDeviceCode(code: string) {
        const user = await this.userRepository.findOne({
          where: { device: code },
          select: ['pumpMode', 'firstTime', 'secondTime'],
        });
        if (!user) {
          throw new NotFoundException('Device not found');
        }
        return user;
    }
    
    async updatePumpMode(code: string, newMode: 'timebased' | 'threshold') {
        const user = await this.userRepository.findOne({ where: { device: code } });
        if (!user) {
          throw new NotFoundException('Device not found');
        }
    
        user.pumpMode = newMode;
        await this.userRepository.save(user);
    
        return { message: 'Pump mode updated successfully' };
    }
    
    async updateTimeMode(code: string, firstTime: string, secondTime: string) {
        const user = await this.userRepository.findOne({ where: { device: code } });
        if (!user) {
          throw new NotFoundException('Device not found');
        }
    
        user.firstTime = firstTime;
        user.secondTime = secondTime;
        await this.userRepository.save(user);
    
        return { message: 'Time mode updated successfully' };
    }
}
