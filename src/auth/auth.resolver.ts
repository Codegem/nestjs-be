import { GqlAuthGuard } from './gql-auth.guard';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login.response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private _authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    const user = await this._authService.login(context.user);
    return user;
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this._authService.signup(loginUserInput);
  }
}
