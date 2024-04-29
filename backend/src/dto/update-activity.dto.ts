import { IsEnum, IsNumber, IsOptional, IsString, MinLength, isString } from "class-validator";

import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityStatus } from "src/enum/activity.status";
import { ActivityType } from "src/enum/activity.type";

export class UpdateActivityDto{

    @IsOptional()
    @MinLength(5)   
    @IsString()
    title : string

    @IsOptional()
    @IsEnum(ActivityType)
    type : ActivityType

    @IsOptional()
    @IsEnum(ActivityPriority)
    priority : ActivityPriority

    @IsOptional()
    @IsEnum(ActivityStatus)
    status : ActivityStatus

    @IsOptional()
    @IsNumber()
    userId : number 

    
}