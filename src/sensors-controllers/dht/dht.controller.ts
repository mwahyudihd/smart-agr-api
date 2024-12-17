import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { DhtService } from "../../sensors-services/dht/dht.service";
import { retry } from 'rxjs';
import { Code } from 'typeorm';

@Controller('dht')
export class DhtController {
    constructor(private dhtService: DhtService){};

    @Get('/data/:code')
    @HttpCode(HttpStatus.OK)
    async getData(@Param('code') code: string){
        const data = await this.dhtService.findAll(code);
        if (!data) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "No Data is found!"
            }
        } else {
            return {
                statusCode: HttpStatus.OK,
                message: "Request success!",
                data: data
            }
        }
    }

    @Get('/current/:code')
    @HttpCode(HttpStatus.OK)
    async getCurrent(@Param('code') code: string) {
        const data = await this.dhtService.findCurrent(code);
    
        if (!data) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "No data available from DHT22 for this device.",
            };
        }
    
        return {
            statusCode: HttpStatus.OK,
            message: "This data from DHT22",
            data,
        };
    }    

    @Post('/data')
    @HttpCode(HttpStatus.CREATED)
    async newData(@Body() body: { device: string, temperature: number, humidity: number }) {
        const { device, temperature, humidity } = body;

        // Memanggil service untuk menyimpan data
        const newDhtData = await this.dhtService.createDht(device, temperature, humidity);

        return {
            statusCode: HttpStatus.CREATED,
            message: "Data is Added",
            data: newDhtData
        };
    }

}
