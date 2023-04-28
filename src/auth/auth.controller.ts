import { Controller, Req,Post, UseGuards, Request, Body, Bind, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/core/normalize';
import { LoginDto } from 'src/user/dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  login(@Body() loginInfo:LoginDto){
   return this.authService.userLogin(loginInfo)
  }

  @Get('userInfo')
  userInfo(@Request() req){
    return req.user
  }
}
