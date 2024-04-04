import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../dto/create-user.input';
import { SignInInput } from '../dto/sign-in.input';
import { Token, User } from '../entities';


@Resolver(() => Token)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => User, { name: 'signUp' })
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.authService.signUp(createUserInput);
  }

  @Mutation(() => Token, { name: 'signIn' })
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @ResolveField('user', () => User, { nullable: 'items' })
  async user(@Parent() token: Token) {
    return this.authService.getUserById(token.userId);
  }

}
