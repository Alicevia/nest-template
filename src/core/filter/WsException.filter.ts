import { ArgumentsHost, Catch, HttpException, WsExceptionFilter } from "@nestjs/common";
import { HTTP_STATUS, NormalizeResponse } from "../normalize";

@Catch()
export class WsException implements WsExceptionFilter{
  catch(exception: any, host: ArgumentsHost) {
    const client = host.switchToWs().getClient()
    const result = NormalizeResponse.fail(new HttpException('网络开小差了，请稍后重试',HTTP_STATUS.SERVICE_UNAVAILABLE,{cause:exception}))
    client.send(JSON.stringify(result))
  }
}
