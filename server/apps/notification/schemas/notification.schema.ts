import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type NotificationDocument = Notification & Document;

@ObjectType()
@Schema()
export class Notification {
  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: false })
  message: string;

  @Field()
  @Prop({ required: true })
  from: string;

  @Field()
  @Prop({ required: true })
  to: string;

  @Field()
  @Prop({ required: true })
  read: boolean;

  @Field()
  @Prop({ required: true, default: 'info' })
  type: string;

  @Field()
  @Prop({ required: true })
  create: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);