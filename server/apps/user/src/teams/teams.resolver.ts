import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team, User } from '../entities';
import { CreateTeamInput } from '../dto/create-team.input';
import { UpdateTeamInput } from '../dto/update-team.input';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {
  }

  @Mutation(() => Team)
  async createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
    return await this.teamsService.create(createTeamInput);
  }

  @Query(() => [Team], { name: 'teams' })
  async findAll() {
    return await this.teamsService.findAll();
  }

  @Query(() => Team, { name: 'teamById' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.teamsService.findOne(id);
  }

  @Query(() => [Team], { name: 'teamsByName' })
  async findByName(@Args('name', { type: () => String }) name: string) {
    return await this.teamsService.findByName(name);
  }

  @Query(() => [Team], { name: 'teamsByLeaderId' })
  async findByLeaderId(@Args('leaderId', { type: () => String }) leaderId: string) {
    return await this.teamsService.findByLeaderId(leaderId);
  }

  @Mutation(() => Team)
  async updateTeam(@Args('updateTeamInput') updateTeamInput: UpdateTeamInput) {
    return await this.teamsService.update(updateTeamInput.id, updateTeamInput);
  }

  @Query(() => Team, { name: 'teamMembers' })
  async findAllMembers(@Args('id', { type: () => String }) id: string) {
    return await this.teamsService.findAllMembers(id);
  }

  @Mutation(() => Team, { name: 'addTeamMembers' })
  async addMembers(@Args('id', { type: () => String }) id: string, @Args('userIds', { type: () => [String] }) userIds: string[]) {
    return await this.teamsService.addMembers(id, userIds);
  }

  @Mutation(() => Team, { name: 'removeTeamMembers' })
  async removeMembers(@Args('id', { type: () => String }) id: string, @Args('userIds', { type: () => [String] }) userIds: string[]) {
    return await this.teamsService.removeMembers(id, userIds);
  }

  @ResolveField('members', () => [User])
  async members(@Parent() team: Team) {
    return await this.teamsService.findAllMembers(team.id);
  }

  @ResolveField('leader', () => User)
  async leader(@Parent() team: Team) {
    return await this.teamsService.findLeader(team.id);
  }
}