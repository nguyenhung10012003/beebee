import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { ProjectsModule } from './projects/projects.module';
import * as process from 'process';
import entities from './entities';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { AllowedAddressesMiddleware } from './middlwares/allowed-addresses.middleware';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
        driver: ApolloFederationDriver,
        autoSchemaFile: {
          federation: 2,
        },
      },
    ),
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env',
      },
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.USER_SERVICE_DB_HOST,
      port: parseInt(process.env.USER_SERVICE_DB_PORT),
      username: process.env.USER_SERVICE_DB_USERNAME,
      password: process.env.USER_SERVICE_DB_PASSWORD,
      database: process.env.USER_SERVICE_DB_NAME,
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    TeamsModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AllowedAddressesMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
