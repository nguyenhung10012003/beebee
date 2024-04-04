import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from '../dto/create-project.input';
import { UpdateProjectInput } from '../dto/update-project.input';
import { DataSource } from 'typeorm';
import { Project, User } from '../entities';

@Injectable()
export class ProjectsService {
  constructor(private dataSource: DataSource) {
  }

  async create(createProjectInput: CreateProjectInput) {
    try {
      const leaderUser = await this.dataSource
        .getRepository(User)
        .findOneBy({ id: createProjectInput.leader });

      if (!leaderUser) {
        throw new Error(`Leader user id ${createProjectInput.leader} not found`);
      }

      const newProject = new Project();
      newProject.name = createProjectInput.name;
      newProject.description = createProjectInput.description;
      newProject.leader = leaderUser;
      newProject.members = [leaderUser];

      return await this.dataSource
        .getRepository(Project)
        .save(newProject);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findAll() {
    try {
      return await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .getMany();
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findOne(id: string) {
    try {
      return await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .where('project.id = :id', { id })
        .getOne();
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findByName(name: string) {
    try {
      return await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .where('project.name LIKE :string', { string: `%${name}%` })
        .getMany();
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findByLeaderId(leaderId: string) {
    try {
      return await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .where('project.leaderId = :leaderId', { leaderId })
        .getMany();
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async update(id: string, updateProjectInput: UpdateProjectInput) {
    try {
      const projectToUpdate = await this.dataSource
        .getRepository(Project)
        .findOneBy({ id });

      if (!projectToUpdate) {
        throw new Error(`Project with id ${id} not found`);
      }

      if (updateProjectInput.name) {
        projectToUpdate.name = updateProjectInput.name;
      }

      if (updateProjectInput.description) {
        projectToUpdate.description = updateProjectInput.description;
      }

      return await this.dataSource
        .getRepository(Project)
        .save(projectToUpdate);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findAllMembers(id: string) {
    try {
      return await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.members', 'members')
        .where('project.id = :id', { id })
        .getOne();
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async addMembers(id: string, userIds: string[]) {
    try {
      await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .relation(Project, 'members')
        .of(id)
        .add(userIds);

      return await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.members', 'members')
        .where('project.id = :id', { id })
        .getOne();
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async removeMembers(id: string, userIds: string[]) {
    try {
      return await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .relation(Project, 'members')
        .of(id)
        .remove(userIds);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async remove(id: string) {
    try {
      return await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .delete()
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}