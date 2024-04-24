import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Activity } from "./activity.entity";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityStatus } from "src/enum/activity.status";
import { User } from "./user.entity";

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
    
    @ManyToOne( () => User)
    @JoinColumn({ name : 'id'})
    @Column({ name: 'user_id'})
    userId : User

    @ManyToOne( () => Activity)
    @JoinColumn({ name : 'id'})
    @Column({ name : 'activity_id'})
    activityId : Activity
} 