import { HttpException } from "@nestjs/common"
import { nowDate } from "../utils"
import { Request } from "express"
import { PaginationDto } from "./common-dto"
import { UserDto } from "src/user/dto"


export class NormalizeResponse<T>{
  message: string='操作成功'
  code: number = 0
  data?:T


  url?: Request['url']
  method?:Request['method']
  body?:Request['body']
  query?:Request['query']
  ip?:Request['ip']
  hostname?:Request['hostname']
  username?:UserDto['username']
  constructor(request?:Request){
    this.body = request?.body
    this.query = request?.query
    this.ip = request?.ip
    this.hostname=request?.hostname
    this.url = request?.url
    this.method = request?.method
  }


  static success<T>(d?:T,request?:Request) {
    let data = new NormalizeResponse<T>(request)
    data.data = d

    return data
  }
  static fail(exception: HttpException,  request?: Request) {
    let data = new NormalizeResponse(request)
    data.username = (request?.user as any)?.username
    data.message = exception.message
    console.log(exception.getResponse(),'--',exception.cause)
    data.data =exception.cause?.message ?? exception.getResponse()
    data.code = exception.getStatus()

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

