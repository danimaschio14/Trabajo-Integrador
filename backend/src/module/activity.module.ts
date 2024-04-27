import { Module, forwardRef } from "@nestjs/common";

import { Activity } from "src/model/activity.entity";
import { ActivityController } from "src/controller/activity.controller";
import { ActivityRecord } from "src/model/activity.record.entity";
import { ActivityRecordModule } from "./activity.record.module";
import { ActivityRecordService } from "src/service/activity.record.service";
import { ActivityService } from "src/service/activity.service";
import { AuthModule } from "./auth.module";
import { Criteria } from "src/model/criteria.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { UserModule } from "./user.module";
import { UserService } from "src/service/user.service";
import { access } from "fs";

@Module({
    controllers:[ActivityController],
    imports:[AuthModule,UserModule,
        forwardRef(() => ActivityRecordModule),TypeOrmModule.forFeature([Activity,User,ActivityRecord
        ])],
    providers:[ActivityService, UserService, ActivityRecordService, Criteria],
    exports: [ActivityService]
})
export class ActivityModule{

}