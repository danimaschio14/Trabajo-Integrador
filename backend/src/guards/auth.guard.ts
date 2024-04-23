import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../decorators/roles.decorator';
import { UserService } from 'src/service/user.service';
import { User } from 'src/model/user.entity';

  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private usuariosService: UserService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token);
  
        const user: User = await this.usuariosService.findOneById(
          payload.sub,
        );
  
        const roles = await this.reflector.get(Roles, context.getHandler());
  
        if (!roles) {
          request['user'] = user;
          return true;
        }
        if (roles.includes(user.role)) {
          request['user'] = user;
          return true;
        }
        throw new UnauthorizedException('Permisos insuficientes');
      } catch {
        throw new UnauthorizedException('Token inválido');
      }
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers['authorization']?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  