import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'process';
import { HashService } from 'src/user/hash.service';
import { UserService } from 'src/user/user.service';
  
  
  @Injectable()
  export class AuthService {
    constructor(private userService: UserService,
      private hashService: HashService,
      private jwtService: JwtService) {}
  
    async validateUser(email: string, pass: string): Promise < any > {
      const user = await this.userService.getUserByUsername(email);
      if (user && (await this.hashService.comparePassword(pass, user.password))) {
        return user;
      }
      return null;
    }
  
    async login(user: any) {
      const payload = {
        username: user.email,
        sub: user.id
      };


      return {
        access_token: this.jwtService.sign(payload),
      };
    }

//  async createForgottenPasswordToken(
//   username:string
//  ): Promise<ForgottenPassword> {
//   var forgottenPassword = await this.userModel
//  }

//     async sendEmailForgotPassword(username: string): Promise<boolean> {
//       var userFromDb = await this.userModel.findOne({ username: email });
//       if (!userFromDb)
//       throw new HttpException("LOGIN_USER_NOT_FOUND", HttpStatus.NOT_FOUND);

//       var tokenModel = await this.createForgottenPasswordToken(email);

//       if (tokenModel && tokenModel.newPasswordToken) {
//         let transporter = nodemailer.createTransport({
//           host: config.mail.host,
//           auth: {
//             user: config.mail.user,
//             pass: config.mail.pass
//           }
//         });

//         let mailOptions = {
//           from: '"Company" <' + config.mail.user + ">",
//           to: email, // list of receivers (seprated by ,)
//           subject: "Forgotton Password",
//           text: "Forgot Password",
//           html:
//           "Hi! <br><br> if you requested to reset your password <br><br>" + 
//           "<b href=" +
//           config.host.url +
//           "i" +
//           config.host.port +
//           "/auth/email/reset-password/" +
//           tokenModel.newPasswordToken +
//           ">click here</a>" // html body
//         };
//       }
//     }
  }