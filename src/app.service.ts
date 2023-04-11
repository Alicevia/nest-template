import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    // throw new Error('ok' )
    return '1'
  }
  getHello2(): string {
    // throw new Error('ok' )
    return '2'
  }
}
