import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {  RegisterUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userInfo: RegisterUserDto):boolean {
     this.userService.create(userInfo);
     return true
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOneByUserId(userId);
  }


  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.remove(userId);
  }

  @Get()
  findAll(@Query() query:FindUserDto) {
    return this.userService.findAll(query);
  }
}
