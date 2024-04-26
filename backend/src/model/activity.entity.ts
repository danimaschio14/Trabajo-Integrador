import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ActivityRecord } from "./activity.record.entity";
import { ActivityType } from "src/enum/activity.type";
import { Expose } from "class-transformer";
import { User } from "./user.entity";

@Entity('activity')
export class Activity{
    
    constructor( title : string , type : ActivityType, user : User ){
        this.title = title
        this.type = type
        this.user = user
    }
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title : string

    @Column()
    type : ActivityType

    @ManyToOne(()=>User)
    @JoinColumn({name:'id_usuario'})
    user:User;
        
    @Expose()
    @OneToMany( () => ActivityRecord, registry => registry.activity)
    records : ActivityRecord[]
}