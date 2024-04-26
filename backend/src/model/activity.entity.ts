import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ActivityStatus } from "src/enum/activity.status";
import { ActivityType } from "src/enum/activity.type";
import { Expose } from "class-transformer";
import { Registry } from "./registry.entity";
import { User } from "./user.entity";
import { constructUsing } from '@automapper/core';

@Entity('activity')
export class Activity{
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    description : string

    @Column({ default: ActivityStatus.CREATED})
    status : ActivityStatus

    @ManyToOne(()=>User)
    @JoinColumn({name:'id_usuario'})
    user:User;
        
    @Expose()
    @OneToMany( () => Registry, registry => registry.activity)
    records : Registry[]
}