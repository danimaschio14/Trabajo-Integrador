import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Registry } from "./registry.entity";
import { User } from "./user.entity";
import { Expose } from "class-transformer";
import { ActivityStatus } from "src/enum/activity.status";

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