import { UserRole } from "src/enum/user-role"
import { UserStatus } from "src/enum/user-status"



export class UpdateUserDto {
    
    name?:string 
    lastName?:string
    email?:string 
    password?:string
    role?:UserRole
    status?: UserStatus
    }


   