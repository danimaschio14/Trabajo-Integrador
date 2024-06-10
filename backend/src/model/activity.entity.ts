import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ActivityRecord } from "./activity.record.entity";
import { ActivityType } from "src/enum/activity.type";
import { Expose } from "class-transformer";
import { User } from "./user.entity";

@Entity('activity')
export class Activity{
    
    constructor( title : string , type : ActivityType){
        this.title = title
        this.type = type
    }
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title : string

    @Column({ type: 'enum', enum: ActivityType})
    type : ActivityType
        
    @OneToMany( () => ActivityRecord, record => record.activity)
    records : ActivityRecord[]
}