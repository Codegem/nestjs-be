import { LoginUserInput } from './dto/login-user.input';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this._userService.getUser(username);

    const valid = await bcrypt.compare(password, user?.password);

    if (!valid || !user) {
      throw new Error('Password or username invalid');
    }

    if (user && valid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    console.log(user);

    return {
      access_token: this._jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const user = await this._userService.findOne(loginUserInput.username);

    if (user) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);
    const username = loginUserInput.username;

    return this._userService.create({
      ...loginUserInput,
      password,
      username,
    });
  }
}
