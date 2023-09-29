import {
  AuthService
} from './auth.service';
import {
  Controller,
  Request,
  UseGuards,
  Post,
  Body
} from '@nestjs/common';
import {
  AuthGuard
} from '@nestjs/passport';
import { ResetPasswordDto } from 'src/user/dto/reset-password.dto';
import { ResetPasswordRequestDto } from 'src/user/dto/reset-password-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post(`/login`)
  async login(@Request() req) {
    // return this.authService.login(req.user);
    const user = req.user; // Assuming the user object includes role information
    
    // Check the user's role
    if (user && user.role === 'super-admin') {
      // If the user is a super-admin, fetch and return the list of all users
      const allUsers = await this.authService.getAllUsers();
      return allUsers;
    } else if (user && user.role === 'admin') {
      // If the user is an admin, fetch and return the list of non-super-admin users
      const nonSuperAdminUsers = await this.authService.getNonSuperAdminUsers();
      return nonSuperAdminUsers;
    } else {
      const findOne = await this.authService.getOneUser(user.username);
      return  findOne;
    }
  }

  
  @Post('/reset-password-request')
  async resetPasswordRequest(@Body() resetPasswordRequestDto: ResetPasswordRequestDto) {
    // Generate a reset token, associate it with the user's account, and send it to the user
    await this.authService.sendPasswordResetEmail(resetPasswordRequestDto.email);
    return { message: 'Password reset email sent.' };
  }

  // Step 3: Reset Password Form (frontend)
  // Create a page or route for users to enter a new password after receiving the reset token

  // Step 4: Validate and Update Password
  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    // Validate the reset token and update the user's password
    await this.authService.resetPassword(resetPasswordDto);
    return { message: 'Password reset successful.' };
  }
}