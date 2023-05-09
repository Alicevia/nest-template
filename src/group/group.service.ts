import { Injectable } from '@nestjs/common';
import { UpdateGroupDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';


@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  create(group:CreateGroupDto) {
    return this.groupRepository.save(group)
  }

  findAll(createBy:string) {
    return this.groupRepository.findBy({createBy});
  }

  findOne(groupId:string) {
    return this.groupRepository.findOneBy({groupId});
  }

  update(groupId: string, updateGroupDto: UpdateGroupDto) {
    return this.groupRepository.update({groupId},updateGroupDto)
  }

  remove(groupId) {

    return this.groupRepository.delete({groupId}).then(()=>true)
  }
}
