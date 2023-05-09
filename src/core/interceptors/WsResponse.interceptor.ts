import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable,map } from "rxjs";
import { NormalizeResponse } from "../normalize";


export class WsResponseInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(data=>{
      return NormalizeResponse.success(data)
    }))
  }
}
