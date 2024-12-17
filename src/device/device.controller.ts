import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('device')
export class DeviceController {
//tabel/entity yang digunakan masih table user
    constructor(private readonly deviceService: DeviceService) {}

    @Get('/:username')
    @HttpCode(HttpStatus.OK)
    async getDevice(@Param('username') username: string) {
    const deviceInfo = await this.deviceService.getDeviceByUsername(username);
    return {
        statusCode: HttpStatus.OK,
        message: 'Device is found!',
        data: deviceInfo,
    };
    }

    @Put('/:username')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async setDevice(
    @Param('username') username: string,
    @Body('device') newDeviceCode: string,
    ) {
    const result = await this.deviceService.updateDeviceCode(username, newDeviceCode);
    return {
        statusCode: HttpStatus.OK,
        message: result.message,
    };
    }

    @Get('/mode/:code')
    @HttpCode(HttpStatus.OK)
    async getPumpMode(@Param('code') code: string) {
    const pumpModeInfo = await this.deviceService.getPumpModeByDeviceCode(code);
    return {
        statusCode: HttpStatus.OK,
        message: 'Request Status Mode success!',
        data: pumpModeInfo,
    };
    }

    @Put('/mode/:code')
    @HttpCode(HttpStatus.OK)
    async updateMode(
    @Param('code') code: string,
    @Body('pumpMode') newMode: 'timebased' | 'threshold',
    ) {
        const result = await this.deviceService.updatePumpMode(code, newMode);
        return {
                statusCode: HttpStatus.OK,
                message: result.message,
            };
    }

    @Put('/time/:code')
    @HttpCode(HttpStatus.OK)
    async updateTimeMode(
    @Param('code') code: string,
    @Body('firstTime') firstTime: string,
    @Body('secondTime') secondTime: string,
    ) {
    const result = await this.deviceService.updateTimeMode(code, firstTime, secondTime);
    return {
        statusCode: HttpStatus.OK,
        message: result.message,
    };
    }
}
