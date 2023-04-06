import { IsNotEmpty, IsNumber,Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {PickType} from '@nestjs/mapped-types'
export class CreateUserDto {

  constructor(obj:CreateUserDto){
    Object.assign(this,obj)
  }

  @ApiProperty({    description: '名称',})
  username: string;

  @ApiProperty({
    description:'手机号码'
  })
  @IsNotEmpty({ message: '手机号不能为空' })
  mobile: string;

  @ApiProperty({description:'密码'})
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(10, 20, { message: '密码的长度不能小于10不能大于20' })
  password: string;

  @ApiProperty()
  email:string

  @ApiProperty()
  @IsNumber()
  state: number;


}

export class LoginInfoDto extends PickType(CreateUserDto,['mobile','password']){}

