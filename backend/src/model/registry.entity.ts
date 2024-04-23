import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Activity } from "./activity.entity";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityStatus } from "src/enum/activity.status";
import { AutoMap } from "@automapper/classes";
import { User } from "./user.entity";

@Entity('registry')
export class Registry {

    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;
    
    @AutoMap()
    @Column()
    status : ActivityStatus

    @AutoMap()
    @Column()
    priority : ActivityPriority

    @AutoMap()
    @Column()
    description : string

    @AutoMap()
    @Column()
    date : Date
    
    @AutoMap()
    @ManyToOne( () => User)
    @JoinColumn({ name : 'id'})
    @Column({ name: 'user_id'})
    userId : User

    @AutoMap()
    @ManyToOne( () => Activity)
    @JoinColumn({ name : 'id'})
    @Column({ name : 'activity_id'})
    activityId : Activity
} 