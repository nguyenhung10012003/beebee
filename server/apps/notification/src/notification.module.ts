import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
    MongooseModule.forRoot(process.env.NOTIFICATION_SERVICE_DB_URI),
  ],
  controllers: [],
  providers: [NotificationService],
})
export class NotificationModule {
}
