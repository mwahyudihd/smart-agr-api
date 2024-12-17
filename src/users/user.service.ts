import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user-entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService, // Inject JwtService
    ){}
    
    async registerUser(data: Partial<User>): Promise<User> {
        const existingUser = await this.userRepository.findOne({
          where: [{ username: data.username }, { device: data.device }],
        });
        if (existingUser) {
          throw new BadRequestException('Username or device already exists.');
        }
    
        const hashedPassword = await bcrypt.hash(data.password, 10);
    
        const user = this.userRepository.create({
          ...data,
          password: hashedPassword,
        });
        return await this.userRepository.save(user);
    }
    
    async loginUser(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
          throw new NotFoundException('User not found.');
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new BadRequestException('Invalid username or password.');
        }
    
        // Generate JWT after successful login
        const payload = { username: user.username, sub: user.id }; // create JWT payload
        const token = this.jwtService.sign(payload);  // Sign the token
    
        // Return token along with user data (excluding password)
        const { password: _, ...result } = user;
        return { ...result, token };
    }
    
    async modifyUsername(id: number, newUsername: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({
          where: { username: newUsername },
        });
        if (existingUser) {
          throw new BadRequestException('Username already taken.');
        }
    
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException('User not found.');
        }
    
        user.username = newUsername;
        return await this.userRepository.save(user);
    }
    
    async changePassword(id: number, newPassword: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException('User not found.');
        }
    
        user.password = await bcrypt.hash(newPassword, 10);
        await this.userRepository.save(user);
    }
}
