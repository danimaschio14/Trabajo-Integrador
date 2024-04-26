import { Activity } from "src/model/activity.entity";
import { ActivityController } from "src/controller/activity.controller";
import { ActivityService } from "src/service/activity.service";
import { Criteria } from "src/model/criteria.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { UserModule } from "./user.module";
import { UserService } from "src/service/user.service";

@Module({
    imports:[TypeOrmModule.forFeature([Activity]), TypeOrmModule.forFeature([User])],
    controllers:[ActivityController],
    providers:[ActivityService, UserService, Criteria],
    exports:[]
})

export class ActivityModule{}