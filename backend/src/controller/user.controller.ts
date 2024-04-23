import { Body, Controller, Get} from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';
import { User } from 'src/model/user.entity';

import { UserService } from 'src/service/user.service';

@Controller('/user')
export class UserController {
  constructor(private service : UserService){}
  
  @Get(':id')
  async getUser(@Body() dto: LoginDto): Promise<User> {
    return await this.service.getUser(dto);
  }

}