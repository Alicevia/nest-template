import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable, Query } from '@nestjs/common';
import {  RegisterUserDto, UserDto, LoginDto, UserDtoPartical } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {Repository} from 'typeorm'
import { BusinessException, PaginationResult } from 'src/core/normalize';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerInfo: RegisterUserDto){
    const {mobile}=registerInfo
    let info= await this.findOne({mobile})
    if(info) BusinessException.throwException('该手机号已被注册')
    return this.userRepository.save(registerInfo).then(()=>true);

  }

  async findAll( query:FindUserDto) {
    const {page,pageSize,username}=query
    let [list,total] =await this.userRepository.findAndCount({
      where:{
        username:username
      },
      skip:pageSize*(page-1),
      take:pageSize,
    })
    return PaginationResult.init({total,page,pageSize,list})
  }

  async findOneByUserId(userId:string) {
    const user = this.findOne({userId})
    if(!user) BusinessException.throwException('无此用户')
    return user
  }

  findOne (userDto:UserDtoPartical){
    return this.userRepository.findOneBy({...userDto,isDelete:false});
  }

  async findOneByLoginInfo(loginInfo:LoginDto){
    console.log('xx',loginInfo,)
    const user = await this.findOne(loginInfo)
    if(!user) BusinessException.throwException('用户名或密码错误')
    return user
  }


  async update(userId: string, updateUserDto: UpdateUserDto) {
    await this.findOneByUserId(userId)
    return this.userRepository.update({userId},updateUserDto).then(()=>true)
  }

  remove(userId:string) {
    return this.userRepository.softDelete({userId}).then(()=>true)
  }
}
