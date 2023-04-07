import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterInfoDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {Repository} from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerInfo: RegisterInfoDto) {
    const {mobile}=registerInfo
    let info= await this.userRepository.findOne({where:{mobile}})
    if(info) throw new Error('用户已注册')
    return this.userRepository.save(registerInfo);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return '';
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
