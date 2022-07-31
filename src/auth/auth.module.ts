import { jwtConfig } from '../configs/jwt.config';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from './../user/user.module';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PassportModule, UserModule, JwtModule.registerAsync(jwtConfig)],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
