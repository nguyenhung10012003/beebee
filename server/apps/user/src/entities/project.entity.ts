import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity()
@Directive('@key(fields: "id")')
export class Project {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column(
    {
      type: 'boolean',
      default: true,
    },
  )
  active: boolean;

  @Field((type) => [User])
  @ManyToMany((type) => User)
  @JoinTable()
  members: User[];

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.projectsOwn)
  leader: User;
}
