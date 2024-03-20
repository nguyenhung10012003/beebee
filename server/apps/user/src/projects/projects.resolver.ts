import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { Project } from '../entities/project.entity';
import { CreateProjectInput } from '../dto/create-project.input';
import { UpdateProjectInput } from '../dto/update-project.input';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {
  }

  @Mutation(() => Project)
  async createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this.projectsService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  async findAll() {
    return this.projectsService.findAll();
  }

  @Query(() => Project, { name: 'project' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.projectsService.findOne(id);
  }

  @Mutation(() => Project)
  async updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
    return this.projectsService.update(updateProjectInput.id, updateProjectInput);
  }

  @Mutation(() => Project)
  async removeProject(@Args('id', { type: () => String }) id: string) {
    return this.projectsService.remove(id);
  }

  @Query(() => [Project], { name: 'projectsByLeader' })
  async findByLeaderId(@Args('leaderId', { type: () => String }) leaderId: string) {
    return this.projectsService.findByLeaderId(leaderId);
  }

  @Query(() => [Project], { name: 'projectsByName' })
  async findByName(@Args('name', { type: () => String }) name: string) {
    return this.projectsService.findByName(name);
  }

  @Query(() => Project, { name: 'projectMembers' })
  async findAllMembers(@Args('id', { type: () => String }) id: string) {
    return this.projectsService.findAllMembers(id);
  }

  @Mutation(() => Project, { name: 'addProjectMembers' })
  async addMembers(@Args('id', { type: () => String }) id: string, @Args('userIds', { type: () => [String] }) userIds: string[]) {
    return this.projectsService.addMembers(id, userIds);
  }

  @Mutation(() => Project, { name: 'removeProjectMembers' })
  async removeMembers(@Args('id', { type: () => String }) id: string, @Args('userIds', { type: () => [String] }) userIds: string[]) {
    return this.projectsService.removeMembers(id, userIds);
  }
}