import { User } from './../user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Tag,User])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
