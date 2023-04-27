import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { LocalStrategy } from './strategies/local-stragegy';

@Module({
  imports:[
    UserModule,PassportModule,
    JwtModule.register({
      secret:'xxx',
      signOptions:{expiresIn:'4h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,LocalStrategy]
})
export class AuthModule {}
