import { Controller, Get, Param, Req } from "@nestjs/common";
import { ActivityRecordService } from "src/service/activity.record.service";

@Controller('record')
export class RecordController {
  constructor(private activityRecordService: ActivityRecordService) {}

  
  // @ApiBearerAuth()
  // @Roles([UserRole.ADMIN,UserRole.EMPLOYEE])
  // @UseGuards(AuthGuard)
  @Get(':activityId')
  async getRecordsByActivityId(@Param('activityId') activityId: number) {
    try {
      const records = await this.activityRecordService.getRecordByID(activityId);
      return { success: true, data: records };
    } catch (error) {
      return { success: false, message: 'Error fetching records for activity' };
    }
  }


   // @ApiBearerAuth()
  // @Roles([UserRole.ADMIN,UserRole.EMPLOYEE])
  // @UseGuards(AuthGuard)
  @Get('ascendente/:activityId')
  async getRecordsByActivityIdASC(@Param('activityId') activityId: number) {
    try {
      const records = await this.activityRecordService.getRecordsByActivityIdAsc(activityId);
      return { success: true, data: records };
    } catch (error) {
      return { success: false, message: 'Error fetching records for activity' };
    }
  }


}


