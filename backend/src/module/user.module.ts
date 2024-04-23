import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { UserController } from "src/controller/user.controller";
import { UserService } from './../service/user.service';

@Module({
    imports : [TypeOrmModule.forFeature([User])],
    exports : [UserService],
    controllers : [UserController],
    providers: [UserService]
})

export class UserModule {};