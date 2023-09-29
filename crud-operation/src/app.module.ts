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
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { SomeModule } from './module/someModule';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'wecall-cms', 
      retryWrites: true,
      w: 'majority',
    }),
    AuthModule,
    UserModule,
    // MailerModule,
    // SomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
