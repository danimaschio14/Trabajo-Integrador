import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ActivityType } from "src/enum/activity.type";

@Entity('activity')
export class Activity{
 
    @PrimaryGeneratedColumn()
    id: number;
     
    @Column()
    name : string
 
    @Column()
    type : ActivityType
}