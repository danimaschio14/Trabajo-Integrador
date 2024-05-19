import { HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as bcryptjs from 'bcryptjs';
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

    return user
  }

  async deleteUser(id: number) {
    let results
    try {
      results = await this.userRepository.delete({ id })
      if (results.affected === 0) {
        return new HttpException("user not found", HttpStatus.NOT_FOUND)
      }
    } catch (Exception) {
      return new HttpException("User can't be delete. Have foreing key", HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return results
  }

  // updateUser(id: number, usuario: UpdateUserDto) {
  //   this.userRepository.update({ id }, usuario)
  //   return usuario
  // }

  async updateUser(id: number,{ name, lastName, email, password, role, status }: CreatUserDto) {
    const usuario:UpdateUserDto= {
      name,
      lastName,
      email,
      password: await bcryptjs.hash(password, 10),
      role,
      status
    }
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

  // async toggleUserStatus(id: number): Promise<User> {
  //   const user = await this.userRepository.findOne({
  //     where: { id }
  //   });
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }

  //   // Cambia el estado de "activo" a "inactivo" o viceversa
  //   user.status = user.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE;

  //   return this.userRepository.save(user);
  // }
} 