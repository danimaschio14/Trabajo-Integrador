import { Activity } from "src/model/activity.entity";
import { ActivityModule } from "./activity.module";
import { ActivityRecord } from "src/model/activity.record.entity";
import { ActivityRecordService } from "src/service/activity.record.service";
import { ActivityService } from "src/service/activity.service";
import { AuthModule } from "./auth.module";
import { Criteria } from "src/model/criteria.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { UserModule } from "./user.module";
import { UserService } from "src/service/user.service";

@Module({
    controllers:[],
    imports:[AuthModule,UserModule, ActivityModule, TypeOrmModule.forFeature([ActivityRecord, Activity, User])],
    providers:[ActivityRecordService, ActivityService, UserService],
    exports:[ActivityRecordService]
})

export class ActivityRecordModule{}