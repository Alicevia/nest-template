import { IsNotEmpty, IsNumber,Length ,MinLength,MaxLength, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {PickType} from '@nestjs/mapped-types'
import { Exclude, Expose } from "class-transformer";
export class CreateUserDto {
  @ApiProperty({ description: '名称',})
  username: string;

  @ApiProperty({
    description:'手机号码'
  })
  @IsNotEmpty({ message: '手机号不能为空' })
  mobile: string;

  @ApiProperty({description:'密码'})
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8,16,{message:'密码长度2-6个字符'})
  @IsString()
  @Exclude()
  password: string;

  @ApiProperty()
  email:string

  @ApiProperty()
  @IsNumber()
  @Exclude()
  state: number;
}

export class RegisterInfoDto extends PickType(CreateUserDto,['password','mobile']){}


