import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserRole } from "src/enum/user.role";
import { UserStatus } from "src/enum/user.status";

@Entity('user')
export class User {

    constructor(name : string, lastname: string, email : string , password : string , role : UserRole, status : UserStatus){
        this.name = name;
        this.lastName = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
    }
         
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name : string
     
    @Column({ name : 'last_name'})
    lastName: string
     
    @Column({ unique: true})
    email: string
    
    @Column()
    password : string
     
    @Column({ type: 'enum', enum: UserRole})
    role : UserRole 
     
    @Column({ type: 'enum', enum: UserStatus})
    status : UserStatus  
}