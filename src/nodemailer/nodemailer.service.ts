import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;

  constructor(private readonly configService: ConfigService) {}

  async ModuleInit() {
    this.fromEmail = '';
    this.transporter = null;

    await this.configService.getConfig().then((config) => {
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
    });
  } 

  async sendMail(
    { to, subject, html }:
      { 
        to: string;
        subject: string;
        html: string;
      }
  ) {
    await this.ModuleInit();
    const message = {
      from: this.fromEmail,
      to,
      subject,
      html,
    };
    try {
      await this.transporter.sendMail(message);
    } catch (error) {
      console.log('Node Mailer error', error?.response ?? error);
    }
    return;
  }
}
