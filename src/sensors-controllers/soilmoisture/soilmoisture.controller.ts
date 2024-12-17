import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { SoilmoistureService } from 'src/sensors-services/soilmoisture/soilmoisture.service';

@Controller('soil')
export class SoilmoistureController {
  constructor(private readonly soilmoistureService: SoilmoistureService) {}

  @Get('/data/:code')
  @HttpCode(HttpStatus.OK)
  async getAllData(@Param('code') code: string) {
    const data = await this.soilmoistureService.getAllDataByDeviceCode(code);
    return {
      statusCode: HttpStatus.OK,
      message: 'Request success!',
      data,
    };
  }

  @Get('/current/:code')
  @HttpCode(HttpStatus.OK)
  async getCurrentData(@Param('code') code: string) {
    const data = await this.soilmoistureService.getCurrentDataByDeviceCode(code);
    return {
      statusCode: HttpStatus.OK,
      message: 'Request data from Soil sensor success!',
      data,
    };
  }

  @Post('/data')
  @HttpCode(HttpStatus.OK)
  async sendData(
    @Body('device') device: string,
    @Body('moisture') moisture: number,
  ) {
    const newData = await this.soilmoistureService.addSoilData(device, moisture);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Soil data sent successfully!',
      data: newData,
    };
  }
}
