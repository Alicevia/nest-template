import { Injectable } from '@nestjs/common';
import { CreateFriendMessageDto } from './dto/create-friend-message.dto';
import { UpdateFriendMessageDto } from './dto/update-friend-message.dto';

@Injectable()
export class FriendMessageService {
  create(createFriendMessageDto: CreateFriendMessageDto) {
    return 'This action adds a new friendMessage';
  }

  findAll() {
    return `This action returns all friendMessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friendMessage`;
  }

  update(id: number, updateFriendMessageDto: UpdateFriendMessageDto) {
    return `This action updates a #${id} friendMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendMessage`;
  }
}
