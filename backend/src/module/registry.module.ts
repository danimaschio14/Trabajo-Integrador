import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Registry } from "src/model/registry.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Registry])],
    controllers:[],
    providers:[],
    exports:[]
})

export class RegistryModule{}