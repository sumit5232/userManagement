// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './user/user.module';



// @Module({
//   imports: [ConfigModule.forRoot({
//     envFilePath: '.env',
//     isGlobal: true,
//   }),
//   MongooseModule.forRoot('mongodb+srv://sumityadav:Sumit@123@testing.ks95mty.mongodb.net/user?retryWrites=true&w=majority'),
//   UserModule,
//   AuthModule,
// ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}






// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb+srv://username:password@cluster.mongodb.net/databaseName', {
//     }),
//   ],
// })
// export class DatabaseModule {}




import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CongratsModule } from './congrats/congrats.module';
import { DomainModule } from './domain/domain.module';
import { LanderModule } from './lander/lander.module';
import { ProductionModule } from './production/production.module';
import { QuizModule } from './quiz/quiz.module';
// import { SomeModule } from './module/someModule';
// import { UserModule } from './user/user.module';
import { ThemeModule } from './theme/theme.module';
import { UserModule } from './user-management/user.module';

import { FileModule } from './image/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.DB_URI, {
    //   dbName: 'wecall-cms', 
    //   retryWrites: true,
    //   w: 'majority',
    // }),

    MongooseModule.forRoot("mongodb://127.0.0.1:27017/wecall-cms"),
    // AuthModule,
    // UserModule,
    // ThemeElementsConfigModule,
    // ThemeElementsListModule,
    ThemeModule,
    QuizModule,
    LanderModule,
    CongratsModule,
    DomainModule,
    ProductionModule,
    UserModule,
    ConfigModule,
    FileModule,

   
    // ThemeConfigModule,
    // ThemeJsonModule,
    // MailerModule,
    // SomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
