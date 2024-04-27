import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Activity } from "./activity.entity";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityStatus } from "src/enum/activity.status";
import { Expose } from "class-transformer";
import { User } from "./user.entity";

@Entity('record')
export class ActivityRecord {

    constructor(priority : ActivityPriority, status: ActivityStatus, date : Date, user : User , activity : Activity){
        this.priority = priority
        this.status = status
        this.date = date
        this.user = user
        this.activity = activity
    }
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description : string
  
    @Column({ type: 'enum', enum: ActivityStatus})
    status : ActivityStatus
    
    @Column({ type: 'enum', enum: ActivityPriority})
    priority : ActivityPriority

    @Column()
    date : Date

    @Expose()
    @ManyToOne( () => User)
    user : User

    @ManyToOne( () => Activity, activity =>  activity.records)
    activity : Activity
} 