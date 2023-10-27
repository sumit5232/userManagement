import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { User, UserSchema } from './entities/user.schema';
import { jwtConfig } from './jwt/jwt.config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { TokenRequest, TokenRequestSchema } from './token-request.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

require('dotenv').config();

@Module({
  imports: [
    
    PassportModule,
    JwtModule.register(jwtConfig),
    NodemailerModule,
    ConfigModule,
    
    MongooseModule.forFeature([

     { name: TokenRequest.name, schema: TokenRequestSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
