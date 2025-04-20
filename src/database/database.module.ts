import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from '../config/env.validation';
import { SequelizeModule } from '@nestjs/sequelize';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        models: [__dirname + '/features/**/entities/*.entity{.ts}'], // Listado de modelos
        autoLoadModels: true, // Carga automaticamente los modelos
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
