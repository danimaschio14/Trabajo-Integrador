import { Module } from '@nestjs/common';
import { DbConnectionModule } from './module/db.module';
import { UserModule } from './module/user.module';
import { AuthModule } from './module/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleCustom } from './module/jwt.module';

@Module({
  imports: [DbConnectionModule,UserModule,AuthModule, JwtModuleCustom]
    
})
export class AppModule {}
