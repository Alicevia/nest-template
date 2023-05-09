import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable, Query } from '@nestjs/common';
import {  RegisterUserDto, UserDto, LoginDto, UserDtoPartical } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {FindOneOptions, FindOptionsSelect, Repository} from 'typeorm'
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
    const user = await this.findOne({userId})
    if(!user) BusinessException.throwException('无此用户')
    return user
  }

  private findOne (userDto:UserDtoPartical,options?:FindOneOptions<User>){
    const where = {...userDto,isDelete:false}
    if(!options){
      options = {where}
    }else{
      options.where=where
    }
    return this.userRepository.findOne(options);
  }

  async findOneByLoginInfo(userDto:UserDtoPartical){
    const user = await this.findOne(userDto,{select:Object.keys(new UserDto) as FindOptionsSelect<User>})
    if(!user)  BusinessException.throwException('用户名或者密码错误')
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
