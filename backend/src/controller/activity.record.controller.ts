import { Controller, Get, Param, Req } from "@nestjs/common";
import { ActivityStatus } from "src/enum/activity.status";
import { Activity } from "src/model/activity.entity";
import { ActivityRecordService } from "src/service/activity.record.service";
import { ActivityService } from "src/service/activity.service";

@Controller('record')
export class RecordController {
  constructor(
    private activityRecordService: ActivityRecordService,
    private activityService: ActivityService
  ) {}

  
  // @ApiBearerAuth()
  // @Roles([UserRole.ADMIN,UserRole.EMPLOYEE])
  // @UseGuards(AuthGuard)
  /*
  @Get(':activityId')
  async getRecordsByActivityId(@Param('activityId') activityId: number) {
    try {
      const records = await this.activityRecordService.getRecordsByActivityId(activityId, "ASC");
      return { success: true, data: records };
    } catch (error) {
      return { success: false, message: 'Error fetching records for activity' };
    }
  }
*/

   // @ApiBearerAuth()
  // @Roles([UserRole.ADMIN,UserRole.EMPLOYEE])
  // @UseGuards(AuthGuard)
  //@Get(':activityId')
  @Get(':activityId/:order')
  async getRecordsByActivityIdDesc(@Param('activityId') activityId: number, @Param('order') order?:string) {
    try {
      if(order != "ASC")
        order = "ASC"
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
        //success: true, 
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


