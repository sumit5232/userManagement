import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { HashService } from './hash.service';
import { User } from "./schemas/user.schema";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    // find(arg0: { role: { $ne: string; }; }) {
    //     throw new Error("Method not implemented.");
    // }
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>, private hashService: HashService
    ) {}

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    async getUserByUsername(username: string) {
        return this.userModel.findOne({
            username
          })
          .exec();
      }

    // async create(user: User): Promise<User>{
    //     const res = await this.userModel.create(user);
    //     return res;
    // }
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

   
  // async changePassword({ 
  //   userId,
  //   newPassword,
  //   currentPassword
  //  }){
  //   const user = await this.userModel.findById(userId)
  //   if(!user) throw new NotFoundException();
  //   if(newPassword === currentPassword) throw new HttpException("Current Password and New Password is same.", HttpStatus.BAD_REQUEST);

  //   try{
  //     await passwordValidationSche.validate(newPassword);
  //   } catch(error){
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }

  //   const oldPassword = user.password;
  //   const verify = await this.verifyPassword( currentPassword , oldPassword);
  //   if(verify){
  //     try{
  //       const hash = await this.generateHash(newPassword);
  //       const result = await this.userModel.updateOne({ _id: userId }, { $set: { password: hash } })
  //       if(result.modifiedCount === 1){
  //         return { code: 200, message: "Password Update Successfully"}
  //       } else {
  //         throw new InternalServerErrorException();
  //       }
  //     } catch(error){
  //       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //     }
  //   } else {
  //     throw new UnauthorizedException()
  //   }
  // }
  // async generateHash(password: string) {
  //   return new Promise((resolve, rejects) => {
  //     bcrypt.genSalt(Number(this.saltRounds), function (err, salt) {
  //       if (err) rejects({ message: 'Generating Salt Error' });
  //       bcrypt.hash(password, salt, function (err, hash) {
  //         console.log(err);
  //         if (!err) resolve(hash);
  //         else rejects({ message: 'Hashing Error' });
  //       });
  //     });
  //   });
  // }
  // saltRounds(saltRounds: any): number {
  //   throw new Error("Method not implemented.");
  // }

  // async verifyPassword(password: string, oldPassword: string) {
  //   return new Promise((resolve, rejects) => {
  //     bcrypt.compare(password, oldPassword, function (err, result) {
  //       if (result) resolve(result);
  //       else
  //         rejects(
  //           new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED),
  //         );
  //     });
  //   });
  // }

}