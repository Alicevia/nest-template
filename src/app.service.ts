import { CustomException } from './core/filter/CustomException.filter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    // CustomException.throwCustomException('自定义业务错误')
    // throw new Error('ok' )
    return '1'
  }
  getHello2(): string {
    // CustomException.throwCustomException('自定义业务错误')
    // throw new Error('ok' )
    return '2'
  }
}
