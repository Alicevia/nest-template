

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import {HTTP_STATUS, NormalizeResponse  } from '../normalize';
import { Request, Response } from 'express';

@Catch()
export class BaseException implements ExceptionFilter {
  // constructor(private readonly logger: Logger) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request= ctx.getRequest<Request>()

    response.send(
      NormalizeResponse.fail(new HttpException('网络开小差了，请稍后重试',HTTP_STATUS.SERVICE_UNAVAILABLE,{cause:exception}),request)
    )
  }
}
