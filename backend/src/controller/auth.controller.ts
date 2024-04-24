import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { CreatUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UserRole } from 'src/enum/user-role';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }


  @Post("register")
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard)
  register(@Body() {name ,lastName,email,password,role,status}: CreatUserDto) {
    return  this.authService.register({name ,lastName,email,password,role,status});
    }

}