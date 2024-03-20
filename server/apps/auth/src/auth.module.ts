import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import process from 'process';
import entities from '../../user/src/entities';

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
    AuthenticationModule, AuthorizationModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {
}
