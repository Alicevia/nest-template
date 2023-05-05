import { Injectable,CACHE_MANAGER,Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { RedisCache } from "cache-manager-redis-yet";
import { Request } from "express";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { throwAuthException } from "src/core/normalize";
import { UserDto } from "src/user/dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'customJwt'){
  token:string;
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager:RedisCache,){
      super({
        jwtFromRequest: (request: Request) => {
          const authHeader = request.headers.authorization;
          if (authHeader && authHeader.startsWith('Bearer ')) {
            this.token = authHeader.substring(7, authHeader.length);
            return this.token
          }
          return null;
        },
        ignoreExpiration: false,
        secretOrKey:'secret',
      })
  }

  async validate(payload:Pick<UserDto,'userId'>,){
    const {userId}=payload

    const token = await this.cacheManager.get(userId)
    if(!token || token !=this.token) throwAuthException()
    return payload
  }

}
