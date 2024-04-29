import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ActivityModule } from './module/activity.module';
import { ActivityRecordModule } from './module/activity.record.module';
import { AppLoggerMiddleware } from './middleware/app-logger.filter';
import { AuthModule } from './module/auth.module';
import { DbConnectionModule } from './module/db.module';
import { JwtModuleCustom } from './module/jwt.module';
import { UserModule } from './module/user.module';

@Module({
  imports: [DbConnectionModule,UserModule,AuthModule, JwtModuleCustom, ActivityModule,ActivityRecordModule]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware)
    .exclude('/auth/(.*)')
    .forRoutes('*');
  }
}
