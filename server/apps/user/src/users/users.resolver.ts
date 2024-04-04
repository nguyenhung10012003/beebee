import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Project, Team, User } from '../entities';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { GraphQLError } from 'graphql/error';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.usersService.create(createUserInput);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') throw new GraphQLError('Email already exists');
      else return new GraphQLError('Something went wrong');
    }
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User, { name: 'userById' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.findOneById(id);
  }

  @Query(() => [User], { name: 'usersByEmail' })
  async findByEmail(@Args('email', { type: () => String }) email: string) {
    return await this.usersService.findByEmail(email);

  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Query(() => [Team], { name: 'userTeams' })
  async findTeams(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.getAllTeams(id);
  }

  @Query(() => [Project], { name: 'userProjects' })
  async findProjects(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.getAllProjects(id);
  }

  @ResolveField('teamsJoin', () => [Team], { nullable: 'items' })
  async teamsJoin(@Parent() user: User) {
    return await this.usersService.getAllTeams(user.id);
  }

  @ResolveField('projectsJoin', () => [Project], { nullable: 'items' })
  async projectsJoin(@Parent() user: User) {
    return await this.usersService.getAllProjects(user.id);
  }

  @ResolveField('teamsOwn', () => [Team], { nullable: 'items' })
  async teamsOwn(@Parent() user: User) {
    return await this.usersService.getOwnedTeams(user.id);
  }

  @ResolveField('projectsOwn', () => [Project], { nullable: 'items' })
  async projectsOwn(@Parent() user: User) {
    return await this.usersService.getOwnedProjects(user.id);
  }
}
