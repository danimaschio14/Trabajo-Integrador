import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Activity } from "./activity.entity";
import { ActivityPriority } from "src/enum/activity.priority";
import { User } from "./user.entity";
import { Expose } from "class-transformer";
import { ActivityType } from "src/enum/activity.type";

@Entity('registry')
export class Registry {

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