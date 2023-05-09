import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { User } from 'src/core/normalize/decorator/user';


@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto:Pick<CreateGroupDto,'name'>,@User('userId') createBy:string) {
    return this.groupService.create({...createGroupDto,createBy});
  }

  @Get()
  findAll(@User('userId') userId:string) {
    return this.groupService.findAll(userId);
  }

  @Get(':groupId')
  findOne(@Param('groupId') groupId: string) {
    return this.groupService.findOne(groupId);
  }

  @Patch(':groupId')
  update(@Param('groupId') groupId: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(groupId, updateGroupDto);
  }

  @Delete(':groupId')
  remove(@Param('groupId') groupId: string) {

    return this.groupService.remove(groupId);
  }
}
