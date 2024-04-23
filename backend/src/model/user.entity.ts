import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { AutoMap } from "@automapper/classes";
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
    
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;
    
    @AutoMap()
    @Column()
    name : string

    @AutoMap()
    @Column({ name : 'last_name'})
    lastName: string
    
    @AutoMap()
    @Column({ unique: true})
    email: string

    @AutoMap()
    @Column()
    password : string
    
    @AutoMap()
    @Column({ type: 'enum', enum: UserRole})
    role : UserRole 

    @AutoMap()
    @Column({ type: 'enum', enum: UserStatus})
    status : UserStatus  
}