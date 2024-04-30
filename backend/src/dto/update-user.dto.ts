import { IsOptional, IsString } from "class-validator"

import { UserRole } from "src/enum/user-role"
import { UserStatus } from "src/enum/user-status"

export class UpdateUserDto {
    
    @IsString()
    @IsOptional()
    name?:string
    
    @IsString() 
    @IsOptional()
    lastName?:string
    
    @IsString()
    @IsOptional()
    email?:string
    
    @IsString() 
    @IsOptional()
    password?:string
    
    @IsString()
    @IsOptional()
    role?:UserRole
    
    @IsString()
    @IsOptional()
    status?: UserStatus
    }


   