import { ConfigService } from '@nestjs/config';
import { NestFactory } from "@nestjs/core";
import { join } from "path";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";

import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from './core/pipe/ValidationPipe.pipe';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    logger:false
  });
  const globalConf =app.get(ConfigService)
  app.useStaticAssets(join(__dirname, "../public"));
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning({
    type:VersioningType.URI,
  })
  const config = new DocumentBuilder()
    .setTitle("管理后台")
    .setDescription("管理后台接口文档")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config));
  // app.setGlobalPrefix('xx')
  await app.listen(globalConf.get('port'));
  console.log('启动ok','https://app.apifox.com/project/2463254')
}
bootstrap();
