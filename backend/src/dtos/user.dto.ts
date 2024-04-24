import { Exclude } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class UserDto{
    
    @IsNotEmpty()
    name : string
    
    @IsNotEmpty()
    lastname: string
     
    @IsNotEmpty()
    email: string
     
    @IsNotEmpty()
    @Exclude()
    password: string

}