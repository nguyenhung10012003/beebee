import { CreateTeamInput } from './create-team.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeamInput extends PartialType(CreateTeamInput) {
  @Field(() => String, { description: 'The id of the team' })
  id: string;

  @Field(() => String, { description: 'The name of the team', nullable: true })
  name: string;

  @Field(() => Boolean, { description: 'The active status of the team', nullable: true })
  active: boolean;
}
