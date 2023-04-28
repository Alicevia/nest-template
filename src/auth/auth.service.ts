import { UserDto, LoginDto } from 'src/user/dto';
import { UserService } from './../user/user.service';
import { Injectable,CACHE_MANAGER,Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { BusinessException } from 'src/core/normalize';
import { JwtService } from '@nestjs/jwt';
import {RedisCache} from 'cache-manager-redis-yet'


@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
   @Inject(CACHE_MANAGER) private readonly cacheManager:RedisCache,
    private readonly jwtService:JwtService){}


  async userLogin(loginInfo:LoginDto){
    const user = await this.userService.findOneByLoginInfo(loginInfo)
    const match = user.password==loginInfo.password
    if(!match) BusinessException.throwException('用户名或密码错误')
    const token =  this.jwtService.sign({
      userId:user.userId,
    })
    this.cacheManager.store.client.rPush('token',token)
    return token
  }
}
