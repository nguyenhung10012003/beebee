import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { DataSource } from 'typeorm';
import { Project, Team, User } from '../entities';

@Injectable()
export class UsersService {
  constructor(private dataSource: DataSource) {
  }

  async create(createUserInput: CreateUserInput) {
    try {
      return await this.dataSource
        .getRepository(User)
        .save(createUserInput);
    } catch (e) {
      console.log(e.code);
      if (e.code === 'ER_DUP_ENTRY') throw new Error('Email already exists');
      else throw new Error('Something went wrong');
      //Todo call logger service
    }
  }

  async findAll() {
    try {
      return await this.dataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .getMany();
    } catch (e) {
      console.log(e);
      //Todo call logger service
      return null;
    }
  }

  async findOne(id: string) {
    try {
      return await this.dataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .getOne();
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.dataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.email LIKE :string', { string: `%${email}%` })
        .getMany();
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      return await this.dataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .update(User)
        .set({
          username: updateUserInput.username,
          role: updateUserInput.role,
        })
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async getAllTeams(id: string) {
    try {
      const res = await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .leftJoinAndSelect('team.members', 'user')
        .where('user.id = :id', { id })
        .getMany();
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async getAllProjects(id: string) {
    try {
      return await this.dataSource
        .getRepository(Project)
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.members', 'user')
        .where('user.id = :id', { id })
        .getMany();
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  getOwnedTeams(id: string) {
    return this.dataSource
      .getRepository(Team)
      .createQueryBuilder('team')
      .where('team.leaderId = :id', { id })
      .getMany();
  }

  async getOwnedProjects(id: string) {
    return this.dataSource
      .getRepository(Project)
      .createQueryBuilder('project')
      .where('project.leaderId = :id', { id })
      .getMany();
  }

}
