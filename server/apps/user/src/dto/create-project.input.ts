import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field(() => String, { description: 'Name of the project' })
  name: string;

  @Field(() => String, { description: 'Description of the project' })
  description: string;

  @Field(() => String, { description: 'User ID of the leader' })
  leader: string;
}
