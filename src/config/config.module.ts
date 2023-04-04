import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {APP_CONF} from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache:true,
      load:[APP_CONF]
    }),
  ],
})
export class GlobalConfigModule {}
