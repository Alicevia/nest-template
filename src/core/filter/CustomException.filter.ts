import { normalizeError } from './../normalize/index';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';


export class CustomException extends HttpException{
  constructor(error){
    super(error,HttpStatus.OK)
  }
  static throwCustomException(message?,code?){
    throw new CustomException(normalizeError(message,code))
  }
}
