import { CreateUserInput } from './create-user.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { description: 'user\'s id' })
  id: string;

  @Field(() => String, { description: 'User name', nullable: true })
  username: string;

  @Field(() => String, { description: 'User role', nullable: true })
  role: string;
}
