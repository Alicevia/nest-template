import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NormalizeResponse } from '../normalize/NormalizeResponse';

interface Response<T>{
  data?:T
}


export class TransformResponseInterceptor<T> implements NestInterceptor<T,Response<T>>{
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {

    return next.handle().pipe(map(data=>{
      return  NormalizeResponse.success<T>(data)
    }))
  }
}

