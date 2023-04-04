import { HttpStatus } from "@nestjs/common"
import { nowDate } from "../utils"
import {HTTP_STATUS} from './HTTP_STATUS'

export const normalizeData = (message,code)=>{
  return {
    timestamp:nowDate(),
    message,
    code
  }
}
export const normalizeError = (message='业务错误',code)=>{
  return {
    timestamp:nowDate(),
    message,
    code:code??HTTP_STATUS.BUSSION_ERROR
  }
}
export const normalize404 = (message='资源不存在') =>normalizeData(message,HttpStatus.NOT_FOUND)
