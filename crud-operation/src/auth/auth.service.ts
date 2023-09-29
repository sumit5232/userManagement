import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config, stdin } from 'process';
import { MailerService } from 'src/mailer/mailer.service';
import { ResetPasswordDto } from 'src/user/dto/reset-password.dto';
import { HashService } from 'src/user/hash.service';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid'; 

  
  @Injectable()
  export class AuthService {
    constructor(private userService: UserService,
      private hashService: HashService,
      private jwtService: JwtService,
      private mailerService: MailerService,
      ) {}
  
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

    async getAllUsers(): Promise<User[]> {
      return this.userService.findAll();
    }
    async getOneUser(username: string): Promise<User> {
     return this.userService.findUserOne(username);
    }
 
    async getNonSuperAdminUsers(): Promise<User[]> {
      return this.userService.findNonSuperAdminUsers();
    }

    private generateUniqueResetToken(): string {
      const resetToken = uuidv4(); // Generate a UUID (Universally Unique Identifier)
      return resetToken;
    }

    async sendPasswordResetEmail(email: string) {
      // Generate a unique reset token and associate it with the user's account
      const resetToken = this.generateUniqueResetToken();
  
      // Save the reset token in the user's account or a dedicated reset tokens collection
      await this.userService.saveResetToken(email, resetToken);
  
      // Send the reset token to the user via email
      await this.mailerService.sendResetPasswordEmail(email, resetToken);
    }
  
    async resetPassword(resetPasswordDto: ResetPasswordDto) {
      // Validate the reset token and check if it's still valid (not expired)
      const isValidToken = await this.userService.validateResetToken(
        resetPasswordDto.email,
        resetPasswordDto.token,
      );
  
      if (!isValidToken) {
        throw new UnauthorizedException('Invalid or expired reset token.');
      }
  
      // Reset the user's password
      await this.userService.resetUserPassword(
        resetPasswordDto.email,
        resetPasswordDto.newPassword,
      );
    }
  }