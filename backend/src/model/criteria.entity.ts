import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

import { ApiProperty } from "@nestjs/swagger"
import { Injectable } from "@nestjs/common"

@Injectable()
export class Criteria {

    @ApiProperty({ required: false, nullable: true })
    @IsOptional()
    @IsNumber()
    userId : number

    @ApiProperty({ required: false, nullable: true })
    @IsOptional()
    @IsNumber()
    activityId : number

    @ApiProperty({ required: false, nullable: true })
    @IsOptional()
    @IsString()
    activityName : string
    
}