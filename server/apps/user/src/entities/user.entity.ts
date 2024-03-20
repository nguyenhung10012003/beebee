import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Team } from './team.entity';
import { Project } from './project.entity';


export enum Role {
  ADMIN = 'ADMIN',
  FREE = 'FREE',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  SUPPORTER = 'SUPPORTER',
}

@ObjectType()
@Entity()
@Directive('@key(fields: "id")')
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column(
    {
      unique: true,
      nullable: false,
    },
  )
  email: string;

  @Field()
  @Column(
    {
      nullable: false,
    },
  )
  password: string;

  @Field()
  @Column(
    {
      type: 'enum',
      enum: Role,
      default: Role.FREE,
    },
  )
  role: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(type => [Team])
  @OneToMany((type) => Team, (team) => team.leader)
  teamsOwn: Team[];

  @Field(type => [Project])
  @OneToMany((type) => Project, (project) => project.leader)
  projectsOwn: Project[];
}
