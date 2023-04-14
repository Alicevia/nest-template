import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Group } from "src/group/entities/group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User,Group])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
