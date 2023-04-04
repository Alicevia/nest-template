import { TransformResponseInterceptor } from './core/interceptors/TransformResponse.interceptor';
import { GlobalConfigModule } from './config/config.module'
import { Module, } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ArticleModule } from './article/article.module'
import { TagModule } from './tag/tag.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { BaseException ,HttpStatusExcept} from "./core/filter";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'testok',
      autoLoadEntities: true,
      synchronize: true,
      username: 'root',
      password: '222111',
      entities: ['/src/**/*.entity{.ts,.js}'],
    }),
    GlobalConfigModule,
    UserModule,
    ArticleModule,
    TagModule,
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
    }
 ],
})
export class AppModule {}
