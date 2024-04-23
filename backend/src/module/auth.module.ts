import { AuthController } from "src/controller/auth.controller";
import { AuthService } from "src/service/auth.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { UserModule } from "./user.module";
import { UserService } from "src/service/user.service";

@Module({
    imports : [UserModule, TypeOrmModule.forFeature([User])],
    exports : [],
    controllers : [ AuthController],
    providers: [AuthService, UserService]
})

export class AuthModule {}