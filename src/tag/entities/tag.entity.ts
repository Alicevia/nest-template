import { Article } from './../../article/entities/article.entity';
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

  @ManyToMany(()=>Article,a=>a.tags)
  articles:Article[]

  @CreateDateColumn()
  createTime:Date

  @UpdateDateColumn()
  updateTime:Date


}
