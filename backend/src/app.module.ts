import { AuthModule } from './module/auth.module';
import { DbConnectionModule } from './module/db.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleCustom } from './module/jwt.module';
import { Module } from '@nestjs/common';
import { UserModule } from './module/user.module';

@Module({
  imports: [DbConnectionModule,UserModule,AuthModule, JwtModuleCustom]
    
})
export class AppModule {}
