import { UserDto, LoginDto } from 'src/user/dto';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { BusinessException } from 'src/core/normalize';

@Injectable()
export class AuthService {
  constructor(private readonly userService:UserService){}
  async validateUser(loginInfo:LoginDto){
    const user =await this.userService.findOneByLoginInfo(loginInfo)
    // const match = await bcrypt.compare(loginInfo.password,user.password)
    const match = user.password==loginInfo.password
    if(!match) BusinessException.throwException('用户名或密码错误')
    return user
  }
}
