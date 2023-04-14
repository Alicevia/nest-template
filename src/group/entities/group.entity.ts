import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  groupId:string

  @Column()
  createBy:string

  @Column()
  name:string

  @Column({nullable:true})
  notice:string

  @CreateDateColumn()
  createTime:Date

  @ManyToMany(()=>User,u=>u.groups)
  users:User[]
}
