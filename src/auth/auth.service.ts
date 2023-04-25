import { UserDto, LoginDto } from 'src/user/dto';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { BusinessException } from 'src/core/normalize';

@Injectable()
export class AuthService {
  constructor(private readonly userService:UserService){}
  async validateUser(userInfo:LoginDto){
    const user =await this.userService.findOne(userInfo)
    if(user) return user
    BusinessException.throwException('用户名或密码错误')
  }
}
