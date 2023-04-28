import { Injectable,CACHE_MANAGER,Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { RedisCache } from "cache-manager-redis-yet";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { throwAuthException } from "src/core/normalize";
import { UserDto } from "src/user/dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'customJwt'){
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager:RedisCache,){
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:'secret',
      })
  }

  async validate(payload:Pick<UserDto,'userId'>){
    console.log(payload,)
    const index =await this.cacheManager.store.client.LPOS('token',payload.userId)

    if(index===-1) throwAuthException()
    return true
  }
}
