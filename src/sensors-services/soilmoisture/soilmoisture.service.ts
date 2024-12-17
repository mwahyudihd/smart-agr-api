import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Soil } from 'src/entities/sensors-entities/soil.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SoilmoistureService {
  constructor(
    @InjectRepository(Soil)
    private readonly soilRepository: Repository<Soil>,
  ) {}

  async getAllDataByDeviceCode(code: string) {
    const data = await this.soilRepository.find({
      where: { device: code },
      order: { timestamp: 'ASC' },
    });

    if (!data.length) {
      throw new NotFoundException('No data found for this device code');
    }

    return data;
  }

  async getCurrentDataByDeviceCode(code: string) {
    const latestData = await this.soilRepository.findOne({
      where: { device: code },
      select: ['device', 'moisture', 'timestamp'],
      order: { timestamp: 'DESC' },
    });

    if (!latestData) {
      throw new NotFoundException('No data found for this device code');
    }

    return latestData;
  }

  async addSoilData(device: string, moisture: number) {
    const newData = this.soilRepository.create({ device, moisture });
    await this.soilRepository.save(newData);
    return newData;
  }
}
