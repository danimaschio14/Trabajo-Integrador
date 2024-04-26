import { ActivityModule } from './module/activity.module';
import { ActivityRecordModule } from './module/activity.record.module';
import { AuthModule } from './module/auth.module';
import { DbConnectionModule } from './module/db.module';
import { JwtModuleCustom } from './module/jwt.module';
import { Module } from '@nestjs/common';
import { UserModule } from './module/user.module';

@Module({
  imports: [DbConnectionModule,UserModule,AuthModule, JwtModuleCustom, ActivityModule, ActivityRecordModule]
})
export class AppModule {}

