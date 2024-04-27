import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRecordDto } from "src/dto/create-record.dto";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityRecord } from "src/model/activity.record.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { ActivityService } from "./activity.service";
import { ActivityStatus } from "src/enum/activity.status";

@Injectable()
export class ActivityRecordService {
    constructor(@InjectRepository(ActivityRecord) private activityRecordRepository : Repository<ActivityRecord>,
        @Inject(forwardRef(() => UserService)) private userService : UserService,
        @Inject(forwardRef(() => ActivityService)) private activityService : ActivityService
    ) {}
    
    async createRecord(dto: CreateRecordDto) {
        let user = await this.userService.getUser(dto.userId)
        if (!user) {
            throw new BadRequestException(
                'User id is not valid',
            );
        }
        let activity = await this.activityService.getActivityById(dto.activityId)
        if (!activity) {
            throw new BadRequestException(
                'activity id is not valid',
            );
        }
        let date = new Date()
        
        let registry = new ActivityRecord(
            dto.priority,
            dto.status,
            date,
            user,
            activity
        )
        console.log(registry)
        return this.activityRecordRepository.save(registry)
    }

}