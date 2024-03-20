import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env',
      },
    ),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {},
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'user',
              url: `${process.env.USER_SERVICE_HOST_NAME}:${process.env.USER_SERVICE_PORT}/graphql`,
            },
            {
              name: 'logger',
              url: `${process.env.LOGGER_SERVICE_HOST_NAME}:${process.env.LOGGER_SERVICE_PORT}/graphql`,
            },
            {
              name: 'auth',
              url: `${process.env.AUTH_SERVICE_HOST_NAME}:${process.env.AUTH_SERVICE_PORT}/graphql`,
            },
          ],
        }),
      },
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
}
