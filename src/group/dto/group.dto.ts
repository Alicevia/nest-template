import { IsNotEmpty, IsNumber,Length ,MinLength,MaxLength, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
export class GroupDto  {
  @ApiProperty({ description: '群名称',})
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;


  @Expose()
  @ApiProperty({description:'群创建则'})
  @IsNotEmpty()
  @IsString()
  createBy:string

  @Expose()
  @ApiProperty({ description: '群提示',})
  @IsString()
  @Length(0,10,{message:'提示文字大于10'})
  notice: string;
}
