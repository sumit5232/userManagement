import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserType } from 'src/types';
import { UserService } from '../user.service';

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  phone: number;
  username: string;
//   type: UserType;
  _id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['HS256'],
      secretOrKey: process.env.JWT_SECRET,
    });
  }

//   async validate(payload: CustomJwtPayload) {
//     const user = await this.userService.validateUserByJwt(payload);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//     // return true;
//   }
}
