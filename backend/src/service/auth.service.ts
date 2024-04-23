import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as bcryptjs from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/model/user.entity';
import { UserService } from './user.service';
import { CreatUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userepo: Repository<User>,
    private usuariosService: UserService,
    private jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto) {
    const user: User = await this.userepo.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid username')
    }

    const correctPassword: boolean = bcrypt.compareSync(loginDto.password, user.password);

    if (!correctPassword) {
      throw new BadRequestException('correct key');
    }

    const token: string = this.jwtService.sign({
      sub: user.id,
      rol: user.role,
    });

    return { token };

  }

  async register({ name, lastName, email, password, role, status }: CreatUserDto) {

    const user = await this.usuariosService.findOneByEmail(email)
    if (user) {
      throw new BadRequestException("User already exists")

    }

    return await this.usuariosService.creatUser({
      name,
      lastName,
      email,
      password: await bcryptjs.hash(password, 10),
      role,
      status
    });
  };


}
