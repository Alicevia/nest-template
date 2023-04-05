import { normalize404, normalizeData, normalizeError } from './../normalize/index';
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
    const exceptionResponse = exception.getResponse()

      if(exception instanceof CustomException){

       return res.status(HttpStatus.OK).send(exceptionResponse)
      }
      res.status(HttpStatus.OK).send(normalizeData(exception.message,exception.getStatus()))
  }
}
