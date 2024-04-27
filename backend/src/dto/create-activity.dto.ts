import { IsNumber, IsNumberString, IsString, MinLength } from "class-validator"

import { ActivityPriority } from "src/enum/activity.priority"
import { ActivityType } from "src/enum/activity.type"
import { Transform } from "class-transformer"

export class CreateActivityDto2{


    @MinLength(5)   
    @IsString()
    name : string
    
    @IsString()
    type : ActivityType

    @IsString()
    priority : ActivityPriority

    @IsNumber()
    userId : number
       
}