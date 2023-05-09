import { PartialType } from '@nestjs/swagger';
import { GroupDto } from './group.dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateGroupDto extends PartialType(PickType(GroupDto,['name','notice'])) {}
