import { Module } from '@nestjs/common';
import { FriendMessageService } from './friend-message.service';
import { FriendMessageController } from './friend-message.controller';

@Module({
  controllers: [FriendMessageController],
  providers: [FriendMessageService]
})
export class FriendMessageModule {}
