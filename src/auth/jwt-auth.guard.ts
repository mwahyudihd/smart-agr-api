import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1]; // Ambil token dari 'Bearer <token>'

    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      // Verifikasi token
      const user = this.jwtService.verify(token);
      request.user = user; // Simpan user dalam request untuk akses berikutnya
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}