import { Controller, Req,Post, UseGuards, Request, Body,  Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/core/normalize';
import { LoginDto, UserDtoPartical } from 'src/user/dto';
import { User } from 'src/core/normalize/decorator/user';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  login(@Body() loginInfo:LoginDto){
   return this.authService.userLogin(loginInfo)
  }

  @Get('userInfo')
  userInfo(@User() user:UserDtoPartical,){
    return this.authService.userInfo(user)
  }
}
