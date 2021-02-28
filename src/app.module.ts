import { GqlAuthGuard } from './auth/guards/graphql-auth.guard';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateSchema } from './config/configuration';
import { TuEnvioModule } from './tu-envio/tu-envio.module';

@Module({
  imports: [    
    ConfigModule.forRoot({
        isGlobal: true,
        expandVariables: true,
        validationSchema: validateSchema,
        validationOptions: {
          //allowUnknown: false,
          abortEarly: true
        }
    }),
    // TypeOrmModule.forRootAsync({
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     useFactory: async (configService: ConfigService) => {
    //       const options: TypeOrmModuleOptions = {
    //         type: 'postgres',
    //         host: configService.get<string>('DB_HOST'),
    //         port: configService.get<number>('DB_PORT'),
    //         username: configService.get<string>('DB_USERNAME'),
    //         password: configService.get<string>('DB_PASSWORD'),
    //         database: configService.get<string>('DB_DATABASE'),
    //         entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //         migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    //         migrationsRun: configService.get<boolean>('MIGRATIONS_RUN'),
    //         cli: {
    //             "migrationsDir": "src/migrations"
    //         },
    //         logging: ["error"],
    //         logger: 'file',
    //         synchronize: configService.get<string>('NODE_ENV') === 'dev',
    //       };
    //       return options;
    //     },
    // }),
    GraphQLModule.forRootAsync({      
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            autoSchemaFile: true,
            // typeDefs:
            installSubscriptionHandlers: true,
            debug: configService.get<string>('NODE_ENV') === 'dev',
            playground: configService.get<string>('NODE_ENV') === 'dev',
            context: ({ req }) => ({ req }),
            bodyParserConfig: { limit: '20mb' },
            path: '/graphql',
        }),
    }),
    TuEnvioModule,   
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*{
      provide: APP_GUARD,
      useClass: GqlAuthGuard
    },*/
  ],
})
export class AppModule {}
