import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import {plainToInstance, } from 'class-transformer'
import {validate} from 'class-validator'
import { ValidateException } from "../normalize";

@Injectable()
export class ValidationPipe implements PipeTransform{
 async transform(value: any, {type,data,metatype}: ArgumentMetadata) {

    if(!metatype|| !this.toValidate(metatype)) return value
    const obj = plainToInstance(metatype,value,{excludeExtraneousValues:true,exposeDefaultValues:true})
    const errors = await validate(obj)


    if(errors.length>0){

      const tip = errors.reduce((pre,item)=>{
          pre[item.property]=Object.values(item.constraints)
          return pre
      },{})
     ValidateException.throwException(tip)
    }
    return obj


  }
  private toValidate(metatype:Function):boolean{
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
