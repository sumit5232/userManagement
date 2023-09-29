import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { jwtConstants } from 'src/strategy/constants';
import { HashService } from './hash.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { MailerModule } from 'src/mailer/mailer.module';

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
     MailerModule,
   ],
  controllers: [UserController],
  providers: [UserService, HashService, AuthService, JwtStrategy, LocalStrategy],
})
export class UserModule {}
