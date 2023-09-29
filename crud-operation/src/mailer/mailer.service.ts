
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import transporter from '../config/mailer.config'; // Verify this import

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;
  constructor() {
    this.ModuleInit()
  }

  async ModuleInit() {
    const config = {
      "_id": {
        "$oid": "64946f34bb242442c090d7d2"
      },
      "nodeMailerConfig": {
        "host": "smtp.gmail.com",
        "port": 587,
        "secure": false,
        "auth": {
          "user": "testadstia@gmail.com",
          "pass": "kuarnuffvfixxoix"
        },
        "_id": {
          "$oid": "647e408ddc0fad11c05b011f"
        }
      },
      "__v": 0
    }
    this.fromEmail = '';
    this.transporter = null;
    // await this.configService.getConfig().then((config) => {
      console.log(config);
      this.fromEmail = config.nodeMailerConfig.auth.user;
      this.transporter = nodemailer.createTransport({
        host: config.nodeMailerConfig.host,
        port: config.nodeMailerConfig.port,
        secure: config.nodeMailerConfig.secure,
        auth: {
          user: config.nodeMailerConfig.auth.user,
          pass: config.nodeMailerConfig.auth.pass,
        },
      });
    // });
  }

  async sendResetPasswordEmail(email: string, resetToken: string): Promise<void> {
    // const mailOptions = {
    //   from: 'sumit.yadav@adstia.com', 
    //   to: email,
    //   subject: 'Password Reset',
    //   text: `Use this token to reset your password: ${resetToken}`,
    // };

    // await this.transporter.sendMail(mailOptions);
  }
}


