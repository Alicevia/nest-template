import { Logger } from 'winston';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {  NormalizeResponse } from '../normalize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Catch(HttpException)
export class HttpStatusExcept implements ExceptionFilter{
  constructor( @Inject(WINSTON_MODULE_PROVIDER) private readonly logger:Logger){}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const result = NormalizeResponse.fail(exception,request)
    this.logger.warn(result)
    response.send(result)
  }
}
