import { Column,CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CommonEntity {
  @CreateDateColumn({
    comment:"创建时间",
  })
  createTime:Date

  @Column({
    comment:'软删除',
    default:false,
    select:false
  })
  isDelete:boolean

}
