import { Mapper } from '@automapper/core';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './../service/auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import { User } from 'src/model/user.entity';
import { UserDto } from 'src/dtos/user.dto';
import { InjectMapper } from '@automapper/nestjs';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService,
  @InjectMapper() private readonly mapper: Mapper
    ) {}

  @Post("/login")
  async login(@Body() requestDto : LoginDto) {
    return await this.authService.login(requestDto);
  }
  
  @Post('/registry')
  async createUser(@Body() userDto : UserDto): Promise<HttpStatus> {
    const result = await this.authService.register(userDto);
    //const mapToDto= this.mapper.map(result,User,UserDto)
    //console.log(mapToDto);
    return HttpStatus.CREATED;
  }
}
