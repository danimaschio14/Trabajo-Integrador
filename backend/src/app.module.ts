import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth.module';
import { AutoMapperModule } from './module/auto-mapper.module';
import { DbConnectionModule } from './module/db.module';
import { JwtModuleCustom } from './module/jwt.module';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserModule } from './module/user.module';

@Module({
  imports: [AuthModule, DbConnectionModule,JwtModuleCustom,UserModule,AutoMapperModule],
  controllers: [AppController,UserController],
  providers: [AppService],
})
export class AppModule {}
