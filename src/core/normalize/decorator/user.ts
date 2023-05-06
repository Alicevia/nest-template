import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserDtoPartical } from "src/user/dto";



export const User = createParamDecorator((data:keyof UserDtoPartical,ctx:ExecutionContext)=>{
  const req = ctx.switchToHttp().getRequest()
  if(data && req.user){
    return req.user[data]
  }
  return req.user
})
