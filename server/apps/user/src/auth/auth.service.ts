import { Inject, Injectable } from '@nestjs/common';
import { SignInInput } from '../dto/sign-in.input';
import { validateEmail, validatePassword, validateUsername } from '../utils/validates';
import { CreateUserInput } from '../dto/create-user.input';
import { UsersService } from '../users/users.service';
import { comparePassword } from '../utils/hashing';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@Inject(UsersService) private readonly usersService: UsersService,
              private dataSource: DataSource,
              private jwtService: JwtService) {
  }

  async signUp(createUserInput: CreateUserInput) {
    try {
      if (!validateEmail(createUserInput.email)) throw new Error('Invalid email');
      if (!validateUsername(createUserInput.username)) throw new Error('Invalid username');
      if (!validatePassword(createUserInput.password)) throw new Error('Invalid password');

      return this.usersService.create(createUserInput);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async signIn(signInInput: SignInInput) {
    const user = await this.usersService.findOneByEmail(signInInput.email);
    if (!user) throw new Error('User not found');
    const isMatch = await comparePassword(signInInput.password, user.password);
    if (!isMatch) throw new Error('Wrong password');

    const payload = { email: user.email, sub: user.id };
    return await this.dataSource.getRepository('Token').save({
      userId: user.id,
      token: this.jwtService.sign(payload),
    });
  }

  async revokeToken(userId: string) {
    await this.dataSource
      .getRepository('Token')
      .createQueryBuilder('token')
      .update()
      .set({ revoked: true })
      .where('token.userId = :userId', { userId })
      .execute();
  }

  async signOut(userId: string) {
    await this.revokeToken(userId);
  }

  async getUserById(id: string) {
    return this.usersService.findOneById(id);
  }
}
