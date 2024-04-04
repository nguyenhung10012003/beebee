import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../entities';

@ObjectType()
@Entity()
@Directive('@key(fields: "id")')
export class Token {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  token: string;

  @Field()
  @Column()
  userId: string;

  @Field(
    {
      nullable: true,
    },
  )
  @Column(
    {
      type: 'datetime',
      nullable: true,
      default: null,
    },
  )
  expiredAt: Date;

  @Field()
  @Column(
    {
      type: 'boolean',
      default: false,
    },
  )
  revoked: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tokens)
  user: User;
}