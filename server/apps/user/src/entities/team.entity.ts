import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity()
@Directive('@key(fields: "id")')
export class Team {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(
    {
      nullable: true,
    },
  )
  @Column(
    {
      type: 'text',
      nullable: true,
    },
  )
  description: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

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
  @ManyToOne((type) => User, (user) => user.teamsOwn)
  leader: User;
}
