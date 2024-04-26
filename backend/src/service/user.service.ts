import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "src/model/user.entity";
import { CreatUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { UserStatus } from "src/enum/user-status";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }


  async obtenerUsuarioPorNombreDeUsuario(name: string,): Promise<User> {
    const usuario: User = await this.userRepository.findOne({
      where: {
        name: name,
        status: UserStatus.ACTIVE,
      },
    });
    return usuario;
  }

  creatUser(user: CreatUserDto) {
    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)
  }


  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }

  getUsers() {
    return this.userRepository.find()
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if (!user) {
      return new HttpException("user not found", HttpStatus.NOT_FOUND)
    }

    return user

  }

  async deleteUser(id: number) {
    const results = await this.userRepository.delete({ id })
    if (results.affected === 0) {
      return new HttpException("user not found", HttpStatus.NOT_FOUND)
    }
    return results
  }

  updateUser(id: number, usuario: UpdateUserDto) {
    this.userRepository.update({ id }, usuario)
    return usuario
  }


  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
        status: UserStatus.ACTIVE,
      },
    });
    return user;
  }
} 