import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet'
import * as csurf from 'csurf'
import * as chalk from 'chalk';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
    try {
      const app = await NestFactory.create(AppModule, {cors: true});
      app.setGlobalPrefix('/api');
      const config = app.get(ConfigService);      
      app.use(helmet());
      //app.use(csurf());
      //app.use(loggerGlobal);
      //app.useGlobalGuards();      
      app.useGlobalPipes(new ValidationPipe({
          transform: true,
        })
      );
      // app.useGlobalInterceptors(new LoggingInterceptor());
      /*const apiModuleSeeder = app.get(ApiModuleSeed);
      const apiModule = await apiModuleSeeder.insertApiModules();
      if(apiModule) {
          Logger.log(chalk.blue.bold('🚀 Seeding Api Module Login settings. Done.!'), 'Api Module');
      }*/

      const port = config.get<number>('APP_PORT'); // loading port using config service            
      await app.listen(port);
      
      Logger.log(chalk.bold.blue(`🚀  Server ready at ${await app.getUrl()}/sample`), 'Bootstrap');
    } catch (error) {
      // logger.error(error)
      Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
      process.exit()
    }
}

bootstrap().catch(e => {
    throw e;
});
