import { IsNotEmpty, IsOptional,Length ,IsEmail,MaxLength, IsString, IsEmpty} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform,instanceToPlain,plainToInstance } from "class-transformer";
import { PickType,PartialType } from "@nestjs/mapped-types";


export class UserDto {

  @Expose()
  @ApiProperty({ description: '用户身份',})
  userId:string

  @Expose()
  @ApiProperty({ description: '名称',})
  @Transform(({ value}) =>(value||undefined),{toClassOnly:true})
  @IsString()
  @IsOptional()
  username: string;

  @Expose()
  @ApiProperty({ description: '头像地址',})
  avatar: string;

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

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(8, 16, { message: '密码长度8-16个字符' })
  @IsString()
  @Expose({toPlainOnly:false})
  password: string;
}


export class LoginDto extends PickType(UserDto,['username','password']){}

export class UserDtoPartical extends PartialType(UserDto){}


export const  UserDtoKeys=(ins:UserDto)=>{
  let plainObj = instanceToPlain(ins,{excludeExtraneousValues:true,exposeDefaultValues:true})
  return Object.keys(plainObj)
}
