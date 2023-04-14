import { Group } from 'src/group/entities/group.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Entity,ManyToMany,JoinTable, PrimaryGeneratedColumn, Column ,CreateDateColumn, OneToMany, PrimaryColumn, } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({
    length:300,
    default:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F13%2F20210613235426_7a793.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683860062&t=4ede495395672cc02ba8c43e4b2a802f"})
  avatar:string

  @Column({unique:true})
  mobile: string;

  @Column({nullable:true})
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createTime:Date

  @Column({nullable:true})
  email:string

  @Column({nullable:true})
  state:number

  @OneToMany(()=>Tag,t=>t.createBy)
  tags:Tag[]

  @ManyToMany(() => Group,(g)=>g.users,)
  @JoinTable({
    joinColumn:{
      name:'userId',
      referencedColumnName:'userId'
    },
    inverseJoinColumn:{
      name:'groupId',
      referencedColumnName:'groupId'
    }
  })
  groups: Group[];

}
