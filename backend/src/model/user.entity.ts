import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "src/enum/user-role";
import { UserStatus } from "src/enum/user-status";
import { Exclude } from "class-transformer";

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
}