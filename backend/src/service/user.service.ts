import { UserRole } from 'src/enum/user.role';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dtos/login.dto';
import { UserStatus } from 'src/enum/user.status';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    
  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async getUser(dto : LoginDto): Promise<User> {
    return await this.userRepository.findOne({
        where: {
          email: dto.email,
          status: UserStatus.ACTIVE
        }
      })
  }

  updateUser(): string {
    return 'usuario actualizado';
  }

  disabledUser(): string {
    return 'usuario deshabilitado';
  }

}