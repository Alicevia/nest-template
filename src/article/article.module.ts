import { Article } from "./entities/article.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Article])],

  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
