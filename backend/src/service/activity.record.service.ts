import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
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
        @Inject(forwardRef(() => UserService)) private userService : UserService,
        @Inject(forwardRef(() => ActivityService)) private activityService : ActivityService,
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
        return this.activityRecordRepository.save(registry)
    }

    async getRecordByID(activityId: number): Promise<ActivityRecord[]> {
        try {
          const records = await this.activityRecordRepository.find({
            where: { activity: { id: activityId } },
          });
          return records;
        } catch (error) {
          // Handle any errors (e.g., invalid activity ID)
          throw new Error('Error fetching records for activity');
        }
      }

      async getRecordsByActivityIdAsc(activityId: number): Promise<ActivityRecord[]> {
        try {
          const records = await this.activityRecordRepository.find({
            where: { activity: { id: activityId } },
            order: { date: 'DESC' }, 
          });
          return records;
        } catch (error) {
          throw new Error('Error fetching records for activity');
        }
      }

}

