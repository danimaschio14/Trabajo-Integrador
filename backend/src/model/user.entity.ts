import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";

import { Activity } from "./activity.entity";
import { UserRole } from "src/enum/user-role";
import { UserStatus } from "src/enum/user-status";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name : string

    @Column()
    lastName: string
    
    @Column()
    email: string

    @Exclude()
    @Column()
    password : string
    
    @Column({ type: 'enum', enum: UserRole})
    role : UserRole 

    @Column({ type: 'enum', enum: UserStatus})
    status : UserStatus  

    @Expose()
    @OneToMany( ()=> Activity, activity => activity.user)
    activities : Activity[]
}