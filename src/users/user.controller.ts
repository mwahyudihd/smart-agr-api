import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { timestamp } from 'rxjs';
import { User } from 'src/entities/user-entity/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() body: Partial<User>) {
      const user = await this.userService.registerUser(body);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User has been created',
        data: user,
      };
    }
  
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async loginUser(@Body() body: { username: string; password: string }) {
      const data = await this.userService.loginUser(body.username, body.password);
      return {
        statusCode: HttpStatus.OK,
        message: 'User login successful',
        data,
      };
    }
  
    @Put('/modify/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async modifyUsername(@Param('id') id: number, @Body() body: { username: string }) {
      const updatedUser = await this.userService.modifyUsername(id, body.username);
      return {
        statusCode: HttpStatus.OK,
        message: 'Username has been updated',
        data: updatedUser,
      };
    }
  
    @Put('/change/:id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async modifyPass(@Param('id') id: number, @Body() body: { password: string }) {
      await this.userService.changePassword(id, body.password);
      return {
        statusCode: HttpStatus.OK,
        message: 'Password has been updated',
      };
    }
}
