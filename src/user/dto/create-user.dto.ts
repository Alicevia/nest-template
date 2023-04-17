import { IsNotEmpty, IsNumber,Length ,IsEmail,MaxLength, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {PickType} from '@nestjs/mapped-types'
import { Exclude, Expose } from "class-transformer";
export class CreateUserDto {

  @Expose()
  @ApiProperty({ description: '用户身份',})
  userId:string

  @Expose()
  @ApiProperty({ description: '名称',})
  username: string;

  @Expose()
  @ApiProperty({
    description:'手机号码'
  })
  @IsNotEmpty({ message: '手机号不能为空' })
  mobile: string;

  @IsEmail()
  @Expose()
  @ApiProperty({description:'邮箱'})
  email:string

  @Expose()
  @ApiProperty()
  @IsNumber()
  @Exclude()
  state: number;
}

export class RegisterInfoDto extends PickType(CreateUserDto,['mobile']){

  @ApiProperty({description:'密码'})
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8,16,{message:'密码长度8-16个字符'})
  @IsString()
  @Expose()
  password: string;
}


