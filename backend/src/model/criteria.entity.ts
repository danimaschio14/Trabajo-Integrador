import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

import { ApiProperty } from "@nestjs/swagger"
import { Injectable } from "@nestjs/common"

@Injectable()
export class Criteria {

    @ApiProperty({ required: false, nullable: true })
    @IsOptional()
    userId : number

    @IsOptional()
    activityId : number

    @IsOptional()
    activityTitle : string
    
}