import { IsNotEmpty, IsNumber,Length ,MinLength,MaxLength, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {PickType, } from '@nestjs/mapped-types'
import { BaseDto } from "src/core/utils/BaseDto";
export class GroupDto extends BaseDto{
  @ApiProperty({ description: '群名称',})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({description:'群创建则'})
  @IsNotEmpty()
  @IsString()
  createBy:string

  @ApiProperty({ description: '群提示',})
  @IsString()
  @Length(0,10,{message:'提示文字大于10'})
  notice: string;
}
export class CreateGroupDto extends PickType(GroupDto,['createBy','name']) {

}


new CreateGroupDto()
