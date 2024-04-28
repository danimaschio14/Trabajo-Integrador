import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports : [TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'integrador',
      password: '1234',
      database: 'daw',
      entities:[__dirname+ "/**/*.entity.ts"],
      autoLoadEntities: true,
      synchronize: true
    })],
})

export class DbConnectionModule {};