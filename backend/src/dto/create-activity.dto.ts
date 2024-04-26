import { IsNumberString, IsString, MinLength } from "class-validator"

import { ActivityPriority } from "src/enum/activity.priority"
import { ActivityType } from "src/enum/activity.type"
import { Transform } from "class-transformer"

export class CreateActivityDto2{


    @Transform(({value})=>value.trim()) 
    @MinLength(5)   
    @IsString()
    name : string
    
    @Transform(({value})=>value.trim())
    @IsString()
    type : ActivityType

    @IsString()
    priority : ActivityPriority

    @IsNumberString()
    userId : number
       
}