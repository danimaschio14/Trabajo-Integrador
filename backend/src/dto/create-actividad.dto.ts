import {IsString } from "class-validator"


export class CreateActivityDto{

    @IsString()
    description : string

}