import { PickType ,IntersectionType} from '@nestjs/mapped-types';
import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/core/normalize/common-dto";
import { UserDto } from './user.dto';


export class FindUserDto extends IntersectionType(PaginationDto,PickType(UserDto,['username']))  {

}
