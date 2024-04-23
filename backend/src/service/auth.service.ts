import * as bcrypt from 'bcryptjs';

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectMapper } from '@automapper/nestjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dtos/login.dto';
import { Mapper } from '@automapper/core';
import { User } from 'src/model/user.entity';
import { UserDto } from 'src/dtos/user.dto';
import { UserRole } from 'src/enum/user.role';
import { UserService } from './user.service';
import { UserStatus } from 'src/enum/user.status';

@Injectable()
export class AuthService {

  private token: string;
  private user: User;

  constructor(private userService: UserService,
    private jwtService: JwtService) {
  }

  async login(dto: LoginDto): Promise<{ token: string }> {
    const user: User = await this.userService.getUser(dto);

    console.log(user)
    if (!user) {
      throw new BadRequestException("El nombre de usuario es incorrecto")
    }
    
    const passwordSuccess: boolean = bcrypt.compareSync(dto.password, user.password);
    
    if (!passwordSuccess) {
      throw new UnauthorizedException("La clave ingresada es incorrecta")
    }

    this.getToken(user.id.toString(), user.role).then(
      (res) => this.token = res);

    return { token: this.token };
  }

  async register(dto: UserDto): Promise<User> {
    this.user = await this.userService.getUser(dto);
    if (this.user != null) {
      throw new BadRequestException("El usuario ya existe")
    }   
    
    return this.userService.createUser(
      new User(
        dto.name,
        dto.lastname,
        dto.email,
        this.encryptPass(dto.password),
        UserRole.CLIENT,
        UserStatus.ACTIVE
      )
    );
  }

  private async getToken(id: string, role: UserRole): Promise<string> {
    return this.jwtService.sign({
      sub: id,
      rol: role.valueOf()
    })
  }

  private encryptPass(pass: string): string {
    return bcrypt.hashSync(pass, 10)
  }
}