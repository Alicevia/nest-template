import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import {plainToInstance} from 'class-transformer'
import {validate} from 'class-validator'
@Injectable()
export class ValidationPipe implements PipeTransform{
 async transform(value: any, {metatype}: ArgumentMetadata) {
    if(!metatype|| !this.toValidate(metatype)) return value
    const obj = plainToInstance(metatype,value)
    const errors = await validate(obj)
    if(errors.length>0){
      console.log(errors)
      throw new Error(JSON.stringify(errors[0].constraints))
    }
    return value

  }
  private toValidate(metatype:Function):boolean{
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
