import { Mapper } from '@automapper/core';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './../service/auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import { UserDto } from 'src/dtos/user.dto';
import { InjectMapper } from '@automapper/nestjs';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post("/login")
  async login(@Body() requestDto: LoginDto) {
    return await this.authService.login(requestDto);
  }

  @Post('/registry')
  async createUser(@Body() userDto: UserDto): Promise<HttpStatus> {
    const result = await this.authService.register(userDto);
    return HttpStatus.CREATED;
  }
}
