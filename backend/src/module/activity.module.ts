import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityController } from "src/controller/activity.controller";
import { AuthModule } from "./auth.module";
import { Activity } from "src/model/activity.entity";
import { User } from "src/model/user.entity";
import { ActivityService } from "src/service/actvity.service";
import { UserModule } from "./user.module";
import { UserService } from "src/service/user.service";


@Module({
    controllers:[ActivityController],
    imports:[AuthModule,UserModule,TypeOrmModule.forFeature([Activity,User])],
    providers:[ActivityService,UserService]
})
export class ActivityModule{

}