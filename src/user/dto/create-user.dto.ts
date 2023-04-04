import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
  constructor(obj:CreateUserDto){
    Object.assign(this,obj)
  }
  @ApiProperty({
    description: '名称',
    default: '用户1',
  })
  @IsNotEmpty({ message: '用户名不允许为空' })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: '密码不允许为空' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({message:'邮箱不能为空'})
  email:string

  @ApiProperty()
  @IsNotEmpty({ message: '状态必填' })
  @IsNumber()
  state: number;


}
