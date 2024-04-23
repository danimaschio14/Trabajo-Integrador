import { AutoMap } from "@automapper/classes"
import { IsNotEmpty } from "class-validator"

export class UserDto{
    
    @AutoMap()
    @IsNotEmpty()
    name : string

    @AutoMap()
    @IsNotEmpty()
    lastname: string
    
    @AutoMap()
    @IsNotEmpty()
    email: string
    
    @AutoMap()
    @IsNotEmpty()
    password: string

}