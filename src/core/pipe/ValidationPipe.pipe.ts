import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import {plainToInstance} from 'class-transformer'
import {validate} from 'class-validator'
import { ValidateException } from "../normalize";
import { filterKey } from "../utils";

@Injectable()
export class ValidationPipe implements PipeTransform{
 async transform(value: any, {type,data,metatype}: ArgumentMetadata) {
    if(!metatype|| !this.toValidate(metatype)) return value
    const obj = plainToInstance(metatype,value)

    const errors = await validate(obj)
    if(errors.length>0){
      const tip = errors.reduce((pre,item)=>{
          pre[item.property]=item.constraints
          return pre
      },{})
     ValidateException.throwException(tip)
    }

    let k = filterKey(obj,value)
    console.log( plainToInstance(metatype,value),value, {type,data,metatype},new metatype)

    return value


  }
  private toValidate(metatype:Function):boolean{
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
