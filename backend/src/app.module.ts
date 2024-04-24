import { AuthModule } from './module/auth.module';
import { DbConnectionModule } from './module/db.module';
import { JwtModuleCustom } from './module/jwt.module';
import { Module } from '@nestjs/common';
import { UserModule } from './module/user.module';
import { ActivityModule } from './module/activity.module';
import { RegistryModule } from './module/registry.module';

@Module({
  imports: [DbConnectionModule,UserModule,AuthModule, JwtModuleCustom, ActivityModule, RegistryModule]
})
export class AppModule {}
