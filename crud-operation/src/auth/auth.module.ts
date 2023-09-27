import {
    Module
  } from '@nestjs/common';
  import {
    AuthService
  } from './auth.service';
  import { AuthController } from './auth.controller';
  import { MongooseModule } from '@nestjs/mongoose';
  import { JwtModule } from '@nestjs/jwt';
  import { jwtConstants } from 'src/strategy/constants';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { HashService } from 'src/user/hash.service';
 
  
  
  @Module({
    imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
   JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60d'
      },
    }),
  ],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, HashService],
  })
  export class AuthModule {}