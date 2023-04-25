import { Controller, Req,Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Public } from 'src/core/normalize';
import { LoginDto } from 'src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  login(@Body() loginDto:LoginDto){
   return this.authService.validateUser(loginDto)
  }
}
