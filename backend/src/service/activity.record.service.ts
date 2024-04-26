import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRecordDto } from "src/dto/create-record.dto";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityRecord } from "src/model/activity.record.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { ActivityService } from "./activity.service";

@Injectable()
export class ActivityRecordService {
    constructor(@InjectRepository(ActivityRecord) private activityRecordRepository : Repository<ActivityRecord>,
        private userService : UserService,
        private activityService : ActivityService
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
        console.log(date)
        let registry = new ActivityRecord(
            ActivityPriority.HIGH,
            date,
            user,
            activity
        )
        console.log(registry)
        return this.activityRecordRepository.save(registry)
    }

}