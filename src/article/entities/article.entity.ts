import { Tag } from 'src/tag/entities/tag.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar',{length:100})
  title: string

  @Column('text')
  description: string

  @Column('text')
  content: string

  @Column({ default: false })
  isDelete: boolean

  @Column('int')
  state:number


  @ManyToOne(( )=>User,(user)=>user.tags)
  createBy:User

  @ManyToMany(()=>Tag,t=>t.id)
  @JoinTable()
  tags:Tag[]

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date

  @VersionColumn()
  version: number
}
