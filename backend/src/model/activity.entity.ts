import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { ActivityType } from "src/enum/activity.type";
import { Expose } from "class-transformer";
import { Registry } from "./registry.entity";
import { User } from "./user.entity";
import { register } from "module";

@Entity('activity')
export class Activity{
 
    constructor(name: string, type : ActivityType, user: User){
        this.name = name
        this.type = type
        this.user = user
    }
    
    @PrimaryGeneratedColumn()
    id: number;
     
    @Column()
    name : string
 
    @Column()
    type : ActivityType

    @Expose()
    @ManyToOne( ()=> User, user => user.id )
    user : User
        
    @Expose()
    @OneToMany( () => Registry, registry => registry.activity)
    records : Registry[]
}