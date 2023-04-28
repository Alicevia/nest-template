import { PassportModule } from '@nestjs/passport';
import { CacheModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports:[

    UserModule,PassportModule,
    JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn:'2h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,]
})
export class AuthModule {}
