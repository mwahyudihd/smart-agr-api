import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dht } from '../../entities/sensors-entities/dht.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DhtService {
    constructor(
        @InjectRepository(Dht)
        private dhtRepository: Repository<Dht>
    ){}

     // Menambahkan data DHT
    async createDht(device: string, temperature: number, humidity: number): Promise<Dht> {
        const dht = this.dhtRepository.create({ device, temperature, humidity });
        return this.dhtRepository.save(dht);
    }

    // Mendapatkan semua data DHT
    async findAll(deviceCode : string): Promise<Dht[]> {
        return this.dhtRepository.createQueryBuilder('dht').where('dht.device = :code', { code: deviceCode }).getMany();
    }

    // Mendapatkan data DHT terbaru berdasarkan waktu
    async findCurrent(deviceCode: string): Promise<Dht | null> {
        return await this.dhtRepository
            .createQueryBuilder('dht')
            .where('dht.device = :code', { code: deviceCode })
            .orderBy('dht.time', 'DESC')
            .getOne();
    }    
}