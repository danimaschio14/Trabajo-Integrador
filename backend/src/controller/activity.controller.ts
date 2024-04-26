import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateActivityDto } from "src/dto/create-activity.dto";
import { Activity } from "src/model/activity.entity";
import { Criteria } from "src/model/criteria.entity";
import { ActivityService } from "src/service/activity.service";

@Controller("activity")
export class ActivityController{

    constructor(private activityService : ActivityService){}
  
    @Get(":id")
    getActivity (@Param("id",ParseIntPipe) id: number ) {
        return this.activityService.getActivityById(id)
    }

    @Get("")
    getActivityByCriteria (@Body() criteria : Criteria ) {
        return this.activityService.getActivityByCriteria(criteria)
    }

    @Post("create")
    createActivity (@Body() activityDto : CreateActivityDto){
        return this.activityService.createActivity(activityDto)
    }
}