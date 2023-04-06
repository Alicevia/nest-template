export class NormalizeData {
  message:string
  code:number
  data:any
  get status(){
    return this.code==0
  }
  constructor(message='操作成功',code=0,data?){
    this.code=code
    this.message=message
    this.data=data
  }
  static success(message?,data?){
   return  new NormalizeData(message,0,data)
  }
  static fail(message,code,data?){
    return new NormalizeData(message,code,data)
  }

}
