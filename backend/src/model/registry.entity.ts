import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Activity } from "./activity.entity";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityStatus } from "src/enum/activity.status";
import { ActivityType } from "src/enum/activity.type";
import { Expose } from "class-transformer";
import { User } from "./user.entity";

@Entity('registry')
export class Registry {

    constructor(priority : ActivityPriority, date : Date, user : User , activity : Activity){
        this.priority = priority
        this.date = date
        this.user = user
        this.activity = activity
    }
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    priority : ActivityPriority

    @Column()
    date : Date

    @Column()
    type : ActivityType

    @Expose()
    @ManyToOne( () => User)
    user : User

    @ManyToOne( () => Activity, activity =>  activity.records)
    activity : Activity
} 