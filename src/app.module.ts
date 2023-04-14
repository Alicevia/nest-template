import { ConfigModule ,ConfigService} from '@nestjs/config';
import { TransformResponseInterceptor } from './core/interceptors/TransformResponse.interceptor';
import { Module, } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { TagModule } from './tag/tag.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { BaseException, HttpStatusExcept} from "./core/filter";
import { APP_CONF } from './config/configuration';
import { FriendModule } from './friend/friend.module';
import { GroupModule } from './group/group.module';
import { FriendMessageModule } from './friend-message/friend-message.module';
import { GroupMessageModule } from './group-message/group-message.module';
import { WsModule } from './ws/ws.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache:true,
      load:[APP_CONF]
    }),
    TypeOrmModule.forRootAsync({
       useFactory:async(configService:ConfigService) =>{
        const db = configService.get('database')
        return  {
          type: 'mysql',
          host:  db.host,
          port: db.prot,
          database:  db.database,
          username: db.username,
          password: db.password,
          autoLoadEntities: true,
          synchronize: true,
          entities: ['src/**/*.entity{.ts,.js}'],
        }
       },
       inject:[ConfigService]
    }),

    UserModule,
    TagModule,
    FriendModule,
    GroupModule,
    FriendMessageModule,
    GroupMessageModule,
    WsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide:APP_FILTER,
      useClass:BaseException
    },
    {
      provide:APP_FILTER,
      useClass:HttpStatusExcept
    },

 ],
})
export class AppModule {}
