import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ActivityType } from "src/enum/activity.type";
// import { AutoMap } from "@automapper/classes";

@Entity('activity')
export class Activity{
 
    // @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;
    
    // @AutoMap()
    @Column()
    name : string

    // @AutoMap()
    @Column()
    type : ActivityType
}