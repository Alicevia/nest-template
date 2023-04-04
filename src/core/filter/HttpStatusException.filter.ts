import { normalize404, normalizeError } from './../normalize/index';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {CustomException} from './index'

@Catch(HttpException)
export class HttpStatusExcept implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>()

      if(exception instanceof CustomException){
       return res.status(HttpStatus.OK).send(exception.getResponse())
      }
      res.status(HttpStatus.OK).send(normalizeError('业务错误ook',667))
  }
}
