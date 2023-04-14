import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GroupMessage {
  @PrimaryGeneratedColumn()
  _id:number

  @Column()
  userId:string

  @Column()
  groupId:string

  @Column()
  content:string

  @Column()
  time:Date
}
