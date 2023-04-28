import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import  {Strategy} from 'passport-local'
import { AuthService } from "../auth.service";
import { LoginDto } from "src/user/dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authService:AuthService){
    super()
  }
   validate(username:LoginDto['username'],password:LoginDto['password']){
    return this.authService.userLogin({username,password})
  }
}
