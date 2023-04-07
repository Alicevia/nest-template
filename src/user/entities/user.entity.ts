import { Article } from './../../article/entities/article.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Entity, PrimaryGeneratedColumn, Column ,UpdateDateColumn, OneToMany, } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  mobile: string;

  @Column({nullable:true})
  username: string;

  @Column()
  password: string;


  @Column({nullable:true})
  email:string

  @Column({nullable:true})
  state:number

  @OneToMany(()=>Tag,t=>t.createBy)
  tags:Tag[]

  @OneToMany(()=>Article,a=>a.createBy)
  articles:Article[]
}
