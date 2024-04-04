import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from '../dto/create-team.input';
import { UpdateTeamInput } from '../dto/update-team.input';
import { DataSource } from 'typeorm';
import { Team, User } from '../entities';

@Injectable()
export class TeamsService {
  constructor(private dataSource: DataSource) {
  }

  async create(createTeamInput: CreateTeamInput) {
    try {
      // Find the leader user based on the leaderId
      const leaderUser = await this.dataSource
        .getRepository(User)
        .findOneBy({ id: createTeamInput.leader });

      // If the leader user is not found, throw an error or handle it appropriately
      if (!leaderUser) {
        throw new Error('Leader user not found');
      }

      // Create a new team object
      const newTeam = new Team();
      newTeam.name = createTeamInput.name;
      newTeam.description = createTeamInput.description;
      newTeam.leader = leaderUser;
      newTeam.members = [leaderUser];

      // Save the new team
      return await this.dataSource
        .getRepository(Team)
        .save(newTeam);
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }


  async findAll() {
    try {
      return await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .getMany();
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async findOne(id: string) {
    try {
      return await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .where('team.id = :id', { id })
        .getOne();
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async findByName(name: string) {
    try {
      return await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .where('team.name LIKE :string', { string: `%${name}%` })
        .getMany();
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async findByLeaderId(leaderId: string) {
    try {
      return await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .where('team.leaderId = :leaderId', { leaderId })
        .getMany();
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async update(id: string, updateTeamInput: UpdateTeamInput) {
    try {
      // Find the team to update
      const teamToUpdate = await this.dataSource
        .getRepository(Team)
        .findOneBy({ id });

      // If the team is not found, throw an error or handle it appropriately
      if (!teamToUpdate) {
        throw new Error('Team not found');
      }

      // Update the rest of the team properties
      if (updateTeamInput.name) {
        teamToUpdate.name = updateTeamInput.name;
      }

      if (updateTeamInput.active !== undefined) {
        teamToUpdate.active = updateTeamInput.active;
      }

      // Save the updated team
      return await this.dataSource
        .getRepository(Team)
        .save(teamToUpdate);
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async findAllMembers(id: string) {
    try {
      const team = await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .leftJoinAndSelect('team.members', 'members')
        .where('team.id = :id', { id })
        .getOne();

      // Check if the team exists
      if (!team) {
        throw new Error('Team not found');
      }

      // Return the members array
      return team.members;
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async addMembers(id: string, userIds: string[]) {
    try {
      await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .relation(Team, 'members')
        .of(id)
        .add(userIds);

      return await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .leftJoinAndSelect('team.members', 'members')
        .where('team.id = :id', { id })
        .getOne();

    } catch (e) {
      console.log(e);
      if (e.code === 'ER_DUP_ENTRY') throw new Error('User already exists in the team');
      //Todo: call logger service
      else throw new Error('Error adding members');
    }
  }

  async removeMembers(id: string, userIds: string[]) {
    try {
      return await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .relation(Team, 'members')
        .of(id)
        .remove(userIds);
    } catch (e) {
      console.log(e);
      //Todo: call logger service
      return null;
    }
  }

  async findLeader(id: string) {
    try {
      const result = await this.dataSource
        .getRepository(Team)
        .createQueryBuilder('team')
        .leftJoinAndSelect('team.leader', 'leader')
        .where('team.id = :id', { id })
        .getOne();
      return result.leader;
    } catch (e) {
      console.log(e);
    }
  }
}
