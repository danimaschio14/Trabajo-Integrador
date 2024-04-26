import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Activity } from "./activity.entity";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityStatus } from "src/enum/activity.status";
import { Expose } from "class-transformer";
import { User } from "./user.entity";

@Entity('registry')
export class Registry {

    constructor(status: ActivityStatus, priority : ActivityPriority, description : string, date : Date, user : User , activity : Activity){
        this.status = status
        this.priority = priority
        this.description
        this.date = date
        this.user = user
        this.activity = activity
    }
    
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