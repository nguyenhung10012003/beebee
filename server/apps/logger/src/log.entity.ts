import { Field, ObjectType } from '@nestjs/graphql';

export enum LogType {
  LOG = 'LOG',
  ERROR = 'ERROR',
  WARN = 'WARN',
}

@ObjectType()
export class Log {

  @Field()
  message: string;
  @Field()
  timestamp: string;
  @Field()
  logType: LogType;
}