import { User } from './../../user/entities/user.entity';
import { Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  name:string

  @Column()
  state:number

  @ManyToOne(()=>User,u=>u.tags)
  createBy:User


  @CreateDateColumn()
  createTime:Date

  @UpdateDateColumn()
  updateTime:Date


}
