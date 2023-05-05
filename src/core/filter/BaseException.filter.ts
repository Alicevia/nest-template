

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject

} from "@nestjs/common";
import {HTTP_STATUS, NormalizeResponse,   } from '../normalize';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Catch()
export class BaseException implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger:Logger
  ){}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request= ctx.getRequest<Request>()
    const result = NormalizeResponse.fail(new HttpException('网络开小差了，请稍后重试',HTTP_STATUS.SERVICE_UNAVAILABLE,{cause:exception}),request)
    this.logger.error(result)
    response.send(result)
  }
}
