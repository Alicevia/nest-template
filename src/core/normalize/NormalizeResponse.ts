import { HttpException } from "@nestjs/common"
import { nowDate } from "../utils"
import { Request } from "express"
import { PaginationDto } from "./common-dto"
export class NormalizeResponse<T> {
  message: string='操作成功'
  code: number = 0
  timestamp: string
  url?: string
  method?: string
  data?:T
  status:boolean=true
  constructor(){
    this.timestamp=nowDate()
  }

  static success<T>(d:T) {
    let data = new NormalizeResponse<T>()
    data.data = d

    return data
  }
  static fail(exception: HttpException, request: Request) {
    let data = new NormalizeResponse()
    data.message = exception.message
    data.data =exception.cause?.cause ?? exception.getResponse()
    data.code = exception.getStatus()

    const {url,method}=request
    data.url=url
    data.method=method
    data.status=false
    return data
  }

}

export class PaginationResult<T> extends PaginationDto{
  total:number
  list: T[]
  constructor({total,list,page,pageSize}){
    super({page,pageSize})
    this.total=total
    this.list=list
  }
  static init<T>(obj:PaginationResult<T>){
   return new PaginationResult(obj)
  }
}
