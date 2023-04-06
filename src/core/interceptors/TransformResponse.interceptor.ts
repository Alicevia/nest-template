import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NormalizeData } from '../normalize/NormalizeData';

interface Response<T>{
  data:T
}

export class TransformResponseInterceptor<T> implements NestInterceptor<T,Response<T>>{
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    return next.handle().pipe(map(data=>NormalizeData.success('操作成功',data)))
  }
}

