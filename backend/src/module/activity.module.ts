import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity } from "src/model/activity.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Activity])],
    controllers:[],
    providers:[],
    exports:[]
})

export class ActivityModule{}