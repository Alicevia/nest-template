import { HttpException } from '@nestjs/common';
import { HTTP_STATUS } from './HTTP_STATUS';


export class BusinessException extends HttpException{
  static throwException (...arg:Partial<ConstructorParameters<typeof HttpException>>){
    const [message='操作失败',code=HTTP_STATUS.BUSINESS_ERROR,error]=arg
     throw new BusinessException(message,code,error)
  }
}

export class ValidateException extends HttpException{
  static throwException (...arg:Partial<ConstructorParameters<typeof HttpException>>){
    let [msg='参数不合法',code=HTTP_STATUS.BAD_REQUEST,error]=arg
    if(typeof msg!='string'){
      msg = {message:'参数不合法',...msg}
    }
    throw new ValidateException(msg,code,error)
  }
}

