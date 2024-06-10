import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { Roles } from "src/decorators/roles.decorator";
import { ActivityStatus } from "src/enum/activity.status";
import { UserRole } from "src/enum/user-role";
import { AuthGuard } from "src/guards/auth.guard";
import { ActivityRecordService } from "src/service/activity.record.service";
import { ActivityService } from "src/service/activity.service";

@Controller('record')
export class RecordController {
  constructor(
    private activityRecordService: ActivityRecordService,
    private activityService: ActivityService
  ) {}

  @Get(':activityId/:order')
  async getRecordsByActivityId(@Param('activityId') activityId: number, @Param('order') order?:string) {
    try {

      let records = await this.activityRecordService.getRecordsByActivityId(activityId, order);

      const activity = await this.activityService.getActivityById(activityId);

      const lastRecord = await this.activityRecordService.getLastRecord(activity);

      for (let r of records) {
        if(r.status == ActivityStatus.UPDATE){
          delete r.priority
          delete r.status
          delete r.date
        }else{
          delete r.description
        }
      }
      return { 
        title: activity.title,
        type: activity.type,
        priority: lastRecord.priority,
        status: lastRecord.status,
        user: lastRecord.user,
        records: records };
    } catch (error) {
      return { success: false, message: 'Error fetching records for activity' };
    }
  }


}


