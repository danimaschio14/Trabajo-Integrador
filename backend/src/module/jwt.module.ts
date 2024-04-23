import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

@Module({
    imports : [JwtModule.register({
        global: true,
        secret: 'secret',
        signOptions: {
            expiresIn: '24h'
        },
    })]
})

export class JwtModuleCustom {};