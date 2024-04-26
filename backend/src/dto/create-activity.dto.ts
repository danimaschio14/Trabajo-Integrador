import { IsNumber, IsNumberString, IsString, MinLength, isNumber } from "class-validator"

import { ActivityType } from "src/enum/activity.type"
import { Transform } from "class-transformer"
import { constructUsing } from "@automapper/core"

export class CreateActivityDto{


    @Transform(({value})=>value.trim()) 
    @MinLength(5)   
    @IsString()
    name : string
    
    @Transform(({value})=>value.trim())
    @IsString()
    type : ActivityType

    @IsNumberString()
    userId : number
       
}