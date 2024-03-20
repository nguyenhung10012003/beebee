import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationResolver } from './authorization.resolver';

@Module({
  providers: [AuthorizationResolver, AuthorizationService],
})
export class AuthorizationModule {}
