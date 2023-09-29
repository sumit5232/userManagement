import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { HashService } from './hash.service';
import { User } from "./schemas/user.schema";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>, private hashService: HashService
    ) {}

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find();
        //const users = await this.userModel.find({ role: { $ne: 'super-admin' } })
        return users;
    }

    async getUserByUsername(username: string) {
        return this.userModel.findOne({
            username
          })
          .exec();
      }
      async findUserOne(username: string): Promise<User> {
        return this.userModel.findOne({username: username}).exec();
      }

    async registerUser(createUserDto: CreateUserDto) {
        // validate DTO
    
        const createUser = new this.userModel(createUserDto);
        // check if user exists
        const users = await this.getUserByUsername(createUser.username);
        if (users) {
          throw new BadRequestException();
        }
        // Hash Password
        createUser.password = await this.hashService.hashPassword(createUser.password);
    
        return createUser.save();
      }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);

        if(!user){
            throw new NotFoundException('User not found')
        }
        return user;
    }

    async updateById(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
        });

    }

    async activate(id: string): Promise<User> {
        const status = await this.userModel.findById(id);
        status.active = true;
        await status.save();
        return status;
      }
    
      async deactivate(id: string): Promise<User> {
        const status = await this.userModel.findById(id);
        status.active = false;
        await status.save();
        return status;
      }

    async deleteById(id: string): Promise<User> {
            return await this.userModel.findByIdAndDelete(id);
    }

    async findNonSuperAdminUsers(): Promise<User[]> {
      try {
        const nonSuperAdminUsers = await this.userModel.find({ role: { $nin: ['super-admin', 'super-admin'] } }).exec(); 
        return nonSuperAdminUsers;
      } catch (error) {
        // Handle any errors here
        throw error;
      }
    }

    
    async saveResetToken(email: string, resetToken: string): Promise<void> {
      try {
        // Find the user by email and update the reset token field
        await this.userModel.findOneAndUpdate(
          { email },
          { $set: { resetToken } },
        ).exec();
      } catch (error) {
        // Handle any errors here
        throw error;
      }
    }

    async validateResetToken(email: string, token: string): Promise<boolean> {
      // Retrieve the user by email from your database
      const user = await this.userModel.findOne({ email });
  
      if (!user) {
        // User not found, token is invalid
        return false;
      }
  
      // Check if the user's reset token matches the provided token
      if (user.resetToken !== token) {
        // Token does not match, it's invalid
        return false;
      }
  
      // Check if the token has expired (you should store an expiration date with the token)
      const tokenExpirationDate = user.resetTokenExpiration;
      if (tokenExpirationDate && tokenExpirationDate < new Date()) {
        // Token has expired, it's invalid
        return false;
      }
  
      // Token is valid
      return true;
    }
  
    // Inside your UserService
async resetUserPassword(email: string, newPassword: string): Promise<void> {
  // Retrieve the user by email from your database
  const user = await this.userModel.findOne({ email });

  if (!user) {
    // User not found, handle the error (e.g., throw an exception)
    throw new NotFoundException('User not found');
  }

  // Update the user's password with the new password
  user.password = newPassword;

  // Optionally, reset the resetToken and resetTokenExpiration fields if needed
  user.resetToken = null;
  user.resetTokenExpiration = null;

  // Save the updated user document
  await user.save();
}

}