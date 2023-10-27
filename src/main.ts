import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { AppModule } from './app.module';
import * as express from 'express';
require('dotenv').config();

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication> (
    AppModule
  );

  //  app.useStaticAssets((join(__dirname), '..', 'public'));
  //  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  //  app.setViewEngine('pug');

  //  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
   app.useStaticAssets(path.join(__dirname , "../uploads"));
   //  allow cors for all
   app.enableCors();

  // await app.listen(process.env.PORT);
  await app.listen(3000);
}
bootstrap();
