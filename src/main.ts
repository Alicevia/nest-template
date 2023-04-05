import { ConfigService } from '@nestjs/config';
import { NestFactory } from "@nestjs/core";
import { join } from "path";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import session from "express-session";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalConf =app.get(ConfigService)
  app.useStaticAssets(join(__dirname, "../public"));
  app.enableVersioning({
    type:VersioningType.URI,
    defaultVersion:['1']
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
}
bootstrap();
