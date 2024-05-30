import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateActivityDto2 } from 'src/dto/create-activity.dto';
import { UpdateActivityDto } from 'src/dto/update-activity.dto';
import { ActivityStatus } from 'src/enum/activity.status';
import { UserRole } from 'src/enum/user-role';
import { AuthGuard } from 'src/guards/auth.guard';
//import { Criteria } from 'src/model/criteria.entity';
import { ActivityService } from 'src/service/activity.service';
import { ActivityRecordService } from "src/service/activity.record.service";

@Controller('activity')
export class ActivityController {
    constructor(
      private activityService: ActivityService,
      private activityRecordService: ActivityRecordService
    ) {}

    // @ApiBearerAuth()
    // @Roles([UserRole.ADMIN])
    // @UseGuards(AuthGuard)
    // @Post()
    // async createActivity(
    //   @Req() request: Request,
    //   @Body() createActivityDto: CreateActivityDto,
    // ) {
    //   await this.activityService.createActivity(
    //     createActivityDto,
    //     request['user'],
    //   );
    // }

    @Get("activities")
    getAllActivity(){
        return this.activityService.getAllActivity()
    }

    // @ApiBearerAuth()
    @Roles([UserRole.ADMIN, UserRole.EMPLOYEE])
    @UseGuards(AuthGuard)
    @Get()
    async getActividades(@Req()request : Request){
      let activities = await this.activityService.getActivity(request['user']);
      
      for (let a of activities) {
        const lastRecord = await this.activityRecordService.getLastRecord(a);
        a["priority"] = lastRecord.priority
        a["status"] = lastRecord.status
        a["user"] = lastRecord.user.email
      }
      return activities
    }

    @Roles([UserRole.ADMIN, UserRole.EMPLOYEE])
    @UseGuards(AuthGuard)
    @Get(":id")
    async getActivity (@Param("id",ParseIntPipe) id: number ) {
        const activity = await this.activityService.getActivityById(id);
        const lastRecord = await this.activityRecordService.getLastRecord(activity);

        return {
          "id": activity.id,
          "title": activity.title,
          "type": activity.type,
          "priority": lastRecord.priority,
          "status": lastRecord.status,
          "user": lastRecord.user
        }
    }

    // @Roles([UserRole.ADMIN, UserRole.EMPLOYEE])
    // @UseGuards(AuthGuard)
    // @Get("criteria")
    // getActivitiesByCriteria (@Body() criteria : Criteria ) {
    //     return this.activityService.getActivityByCriteria(criteria)
    // }

    @Roles([UserRole.ADMIN])
    @UseGuards(AuthGuard)
    @Post()
    createActivity2 (@Req()request : Request, @Body() activityDto : CreateActivityDto2){
        const userAdminId = request['user'].id
        return this.activityService.createActivity2(activityDto, userAdminId)
    }

    //@Roles([UserRole.ADMIN])
    @UseGuards(AuthGuard)
    @Patch(":id")
    updateActivity (@Req()request : Request, @Param("id", ParseIntPipe) id: number, @Body() updateActivityDto : UpdateActivityDto){
      const userId = request['user'].id;
      const role = request["user"].role
      
      if(role == UserRole.EMPLOYEE && this.checksEmployee(updateActivityDto))
        throw new UnauthorizedException("Solo tienes los permisos para modificar el estado por el valor IN PROGRESS, FINISHED o CANCELED");

      return this.activityService.updateActivity(id, updateActivityDto, userId)
    }

    private checksEmployee(updateActivityDto : UpdateActivityDto){

      if(updateActivityDto.priority)
        return true;
      if(updateActivityDto.userId)
        return true;
      if(updateActivityDto.title)
        return true;
      if(updateActivityDto.type)
        return true;
      /*if(updateActivityDto.status != ActivityStatus.CANCELED && updateActivityDto.status != ActivityStatus.FINISHED && updateActivityDto.status != ActivityStatus.IN_PROGRESS)
        return true;
      */
      return false;
    }
}