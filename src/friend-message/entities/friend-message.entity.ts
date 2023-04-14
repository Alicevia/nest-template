import {PrimaryGeneratedColumn,Column,Entity} from 'typeorm'

@Entity()
export class FriendMessage {
  @PrimaryGeneratedColumn()
  _id:number

  @Column()
  userId:string

  @Column()
  friendId:string

  @Column()
  content:string

  @Column()
  time:Date
}
