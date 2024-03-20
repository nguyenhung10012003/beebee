import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MyLoggerService } from './logger.service';
import { Log } from './log.entity';

@Resolver(() => Log)
export class LoggerResolver {
  constructor(private readonly loggerService: MyLoggerService) {
  }

  @Mutation(() => Log)
  log(@Args('message', { type: () => String }) message: string) {
    return this.loggerService.log('Hello World');
  }

  @Mutation(() => Log)
  error(@Args('message', { type: () => String }) message: string) {
    return this.loggerService.error('Hello World');
  }

  @Mutation(() => Log)
  warn(@Args('message', { type: () => String }) message: string) {
    return this.loggerService.warn('Hello World');
  }

}