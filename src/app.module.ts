import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './feature/user/user.module';
import { DatabaseModule } from './database/database.module';
import { configValidationSchema } from './config/env.validation';
import { RolesModule } from './feature/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    UserModule,
    DatabaseModule,
    RolesModule,
  ],
  providers: [],
})
export class AppModule {}
