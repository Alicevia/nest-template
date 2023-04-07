import { normalizeError } from './../normalize/returnValue';
import {CustomException} from './index'

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HTTP_STATUS } from '../normalize';

@Catch()
export class BaseException implements ExceptionFilter {
  // constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if(exception instanceof CustomException){

      return response.send(exception.getResponse())
     }
    response.send(normalizeError(exception.message,HTTP_STATUS.BUSINESS_ERROR))

  }
}
