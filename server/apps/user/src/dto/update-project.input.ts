import { CreateProjectInput } from './create-project.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => String, { description: 'ID of the project' })
  id: string;

  @Field(() => String, { description: 'Name of the project' })
  name: string;

  @Field(() => String, { description: 'Description of the project' })
  description: string;
}
