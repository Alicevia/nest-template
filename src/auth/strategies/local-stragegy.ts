import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import  * as plocal from 'passport-local'
import { AuthService } from "../auth.service";
import { LoginDto } from "src/user/dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(plocal.Strategy){
  constructor(private authService:AuthService){
    super()
  }
   validate(userInfo:LoginDto){
    return this.authService.validateUser(userInfo)
  }
}
