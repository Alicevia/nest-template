import { Entity, PrimaryGeneratedColumn, Column ,} from "typeorm";

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  friendId:string


  @Column()
  userId:string
}
