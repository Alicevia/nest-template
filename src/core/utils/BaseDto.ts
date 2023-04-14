interface Obj {
  [k:string]:any
}
export class BaseDto {
  constructor(obj:Obj){
  for (const key in this) {
    console.log('===================',key)
    this[key]=obj[key]
  }
 }
}
