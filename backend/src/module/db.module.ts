import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports : [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'activity_managment_db',
    autoLoadEntities: true,
    synchronize: false //permite sincronizar y actualizar desde la entidad la columna.
    })],
})

export class DbConnectionModule {};