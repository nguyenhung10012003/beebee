import { Module } from '@nestjs/common';
import { MyLoggerService } from './logger.service';
import { LoggerResolver } from './logger.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env',
      },
    ),
  ],
  controllers: [],
  providers: [MyLoggerService, LoggerResolver],
})
export class LoggerModule {
}
