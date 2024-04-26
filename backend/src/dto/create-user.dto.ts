import { IsEmail, IsString, MinLength } from "class-validator"

import { Transform } from "class-transformer"
import { UserRole } from "src/enum/user-role"
import { UserStatus } from "src/enum/user-status"

export class CreatUserDto {
    
    @Transform(({value})=>value.trim())
    @MinLength(2)
    @IsString()	
    name:string
    
    @Transform(({value})=>value.trim())
    @IsString()
    lastName:string
    
    @IsEmail()
    email:string

    @Transform(({value})=>value.trim())
    @IsString()
    password:string
    
    @Transform(({value})=>value.trim())
    @IsString()
    role:UserRole

    @Transform(({value})=>value.trim())
    @IsString()
    status: UserStatus
        
}
