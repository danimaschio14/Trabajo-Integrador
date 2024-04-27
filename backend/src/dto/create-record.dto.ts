import { IsEnum, IsNumber, IsString } from "class-validator"

import { ActivityPriority } from "src/enum/activity.priority"
import { ActivityStatus } from "src/enum/activity.status"

export class CreateRecordDto{

    constructor(status : ActivityStatus, priority : ActivityPriority, description : string, userId : number, activityId : number ){
        this.status = status
        this.priority = priority
        this.description = description
        this.userId = userId
        this.activityId = activityId        
    }
    
    @IsEnum(ActivityStatus)
    status : ActivityStatus

    @IsEnum(ActivityPriority)
    priority : ActivityPriority
   
    @IsString()
    description : string
    
    @IsNumber()
    userId : number 
    
    @IsNumber()
    activityId : number
}