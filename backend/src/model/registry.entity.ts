import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Activity } from "./activity.entity";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityStatus } from "src/enum/activity.status";
import { User } from "./user.entity";
import { Expose } from "class-transformer";

@Entity('registry')
export class Registry {

    @PrimaryGeneratedColumn()
    id: number;
         
    @Column()
    status : ActivityStatus

    @Column()
    priority : ActivityPriority
   
    @Column()
    description : string

    @Column()
    date : Date
    
    @Expose()
    @ManyToOne( () => User)
    user : User

    @ManyToOne( () => Activity, activity =>  activity.records)
    activity : Activity
} 