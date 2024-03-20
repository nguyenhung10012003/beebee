import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeamInput {
  @Field(() => String, { description: 'The name of the team' })
  name: string;

  @Field(() => String, { description: 'The id of the leader of the team' })
  leader: string;
}
