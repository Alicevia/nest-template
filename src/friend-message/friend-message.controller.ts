import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendMessageService } from './friend-message.service';
import { CreateFriendMessageDto } from './dto/create-friend-message.dto';
import { UpdateFriendMessageDto } from './dto/update-friend-message.dto';

@Controller('friend-message')
export class FriendMessageController {
  constructor(private readonly friendMessageService: FriendMessageService) {}

  @Post()
  create(@Body() createFriendMessageDto: CreateFriendMessageDto) {
    return this.friendMessageService.create(createFriendMessageDto);
  }

  @Get()
  findAll() {
    return this.friendMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendMessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendMessageDto: UpdateFriendMessageDto) {
    return this.friendMessageService.update(+id, updateFriendMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendMessageService.remove(+id);
  }
}
