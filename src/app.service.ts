import { CustomException } from './core/filter/CustomException.filter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    throw new Error('我自己扔的')
    return '3'
  }
}
