import { IsEnum, IsNumber, IsString } from "class-validator"

import { ActivityPriority } from "src/enum/activity.priority"
import { ActivityStatus } from "src/enum/activity.status"

export class CreateRegistryDto{

    @IsEnum(ActivityStatus)
    status : string

    @IsEnum(ActivityPriority)
    priority : string
   
    @IsString()
    description : string
    
    @IsNumber()
    userId : number 
    
    @IsNumber()
    activityId : number
}