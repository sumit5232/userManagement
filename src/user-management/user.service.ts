import { ConflictException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {User, UserDocument } from "./entities/user.schema";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import * as moment from 'moment';
import * as uuid from 'uuid';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import emailTemplates from 'src/templates';
// import emailTemplates from "../../views/index";
import { TokenRequest, TokenRequestDocument } from "./token-request.schema";
import { Request } from 'express';
import { UserModule } from "./user.module";

@Injectable()
export class UserService{
        saltRounds: string = process.env.SALT_ROUNDS;
        jwtSecret: string = process.env.JWT_SECRET;
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(TokenRequest.name)
        private readonly tokenRequestModel: Model<TokenRequestDocument>,
        private nodeMailerService: NodemailerService,
    ){}

    async generateHash(password: string) {
        return new Promise((resolve, rejects) =>{
            bcrypt.genSalt(Number(this.saltRounds), function (err, salt) {
                if(err) rejects({ message: 'Generating Salt Error' });
                bcrypt.hash(password, salt, function (err, hash) {
                    if(!err) resolve(hash);
                    else rejects({ message: 'Hashing Error'});
                });
            });
        });
    }

    // generate JWT 
    async generateJWT(data: JwtPayload){
        return new Promise(async (resolve, rejects) => {
            try {
                const token = jwt.sign(data, this.jwtSecret, {
                    expiresIn: '100d',
                    algorithm: 'HS256',
                });
                resolve(token);
            }catch(error) {
                rejects(error);
            }
        });
    }
async signup({
    email,
    phone,
    password,
  }: {
    email?: string;
    phone?: number;
    password?: string;
  }) {
    email = email.toLowerCase();

    const findEmail = await this.userModel.findOne({ email });
    const findPhone = await this.userModel.findOne({ phone });

    if (email && email != '' && findEmail)
      throw new ConflictException('Email Exists');

    if (phone && phone != undefined && findPhone)
      throw new ConflictException('Phone Exists');

    const hash = await this.generateHash(password);
    const entry = new this.userModel({ password: hash, email, phone });
    await entry.save();

   

    return new HttpException(
      {
        message: 'Signup Success',
        userId: entry._id,
        token: await this.generateJWT({ email, phone, _id: entry._id }),
      },
      HttpStatus.OK,
    );
  }
///////////////////////////////////////////
  async createUser({
    email,
    phone,
    // password,
  }: {
    email?: string;
    phone?: number;
    // password?: string;
  }) {
    email = email.toLowerCase(); 
    
    const findEmail = await this.userModel.findOne({ email });
    const findPhone = await this.userModel.findOne({ phone });

    if (email && email != '' && findEmail)
      throw new ConflictException('Email Exists');

    if (phone && phone != undefined && findPhone)
      throw new ConflictException('Phone Exists');
      {
    // Hash the user's password
    // const hash = await this.generateHash(password);

    // Generate a temporary password
    const temporaryPassword = Math.random().toString(36).slice(-8);

    // Save the user to the database
    const user = new this.userModel({
      email,
      // password: hash,
      temporaryPassword,
    });
    await user.save();

    // Send an email with the temporary password
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'testadstia@gmail.com', // 
        pass: 'kuarnuffvfixxoix', // 
      },
    });

    const mailOptions = {
      from: 'testadstia@gmail.com', //
      to: user.email,
      subject: 'One time Password',
      text: `Your One time password: ${temporaryPassword}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return new HttpException(
      {
        message: 'Signup Success, check your email for a one time password',
        userId: user._id,
        token: await this.generateJWT({ email, phone ,_id: user._id }),
      },
      HttpStatus.OK,
    );
  }
  }
  async updateUserPassword(email: string, temporaryPassword: string) {
    // Find the user by email
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return 'User not found';
    }
// if(user.password)
    // Hash the new password
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return 'Password updated successfully';
  }

  ////////////////SignIn /////////////////

  async verifyPassword(password: string, oldPassword: string) {
    return new Promise((resolve, rejects) => {
      bcrypt.compare(password, oldPassword, function (err, result) {
        if (result) resolve(result);
        else
          rejects(
            new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED),
          );
      });
    });
  }

  async createLoginAuditLog(payload: {
    logType?: string;
    ip: string;
    userId: string;
    deviceInfo?: string;
    deviceCoordinates?: { lat: number; lon: number };
    email?: string;
    phone?: number;
    type: string;
    message?: string;
  }) {
    if (!payload) {
      console.log('Payload not found');
      return false;
    }

    // const locationInfo = await this.getIpInfo(payload.ip);

    // this.sendLoginAuditLogs({
    //   logType: payload.logType,
    //   email: payload.email,
    //   phone: payload.phone,
    //   type: payload.type,
    //   message: payload?.message,
    //   timestamp: new Date(),
    //   ip: payload.ip,
    //   deviceInfo: payload.deviceInfo,
    //   deviceCoordinates: payload.deviceCoordinates,
    //   ipCoordinates: {
    //     lat: locationInfo?.lat,
    //     lon: locationInfo?.lon,
    //   },
    //   location: {
    //     CountryCode: locationInfo?.countryCode,
    //     regionCode: locationInfo?.region,
    //   },
    //   proxy: locationInfo?.proxy,
    //   hosting: locationInfo?.hosting,
    // });
  }


  async signIn({ email, phone, password}, request: Request) {
    let userId = '';
    try {
      if (!email && !phone) throw 'Either email or phone is required';

      if (!password) throw 'Password is required';

      if (email) email = email.toLowerCase();
      const payload = {
        softDelete: { $ne: true },
      };
      if (email) payload['email'] = email;
      if (phone) payload['phone'] = phone;

      const findUser = await this.userModel.findOne(payload);
      userId = findUser?._id;
      if (findUser) {
        const isValidPassword = await this.verifyPassword(
          password,
          findUser?.password,
        );
        if (isValidPassword) {
          //  if there is a token request, delete it
          const prevToken = await this.tokenRequestModel
            .findOne({ userId: findUser._id }, '_id')
            .exec();
          if (prevToken) {
            console.log("Deleting password reset token that wasn't used");
            await this.tokenRequestModel.findByIdAndDelete(prevToken._id);
          }

          this.createLoginAuditLog({
            ip: String(
              request.headers['x-forwarded-for'] 
                // request?.connection?.remoteAddress,
            ),
            email: email,
            phone: phone,
            type: 'success',
            message: 'User logged in successfully',
            deviceInfo: String(request.headers['user-agent']) || '',
            userId: String(userId) || null,
          });

          return new HttpException(
            {
              token: await this.generateJWT({
                _id: findUser._id,
                name: findUser.name,
                // profileImage: findUser.profileImage,
                email: findUser.email,
                phone: findUser.phone,
              }),
              userId: findUser._id,
              name: findUser.name || 'Anonymous',
              // profileImage: findUser.profileImage,
              email: findUser.email,
              phone: findUser.phone,
              status: 'success',
            },
            HttpStatus.OK,
          );
        } else {
          throw 'Invalid Credentials';
        }
      } else {
        throw 'User Not Found';
      }
    } catch (error) {
      console.log(error);
      this.createLoginAuditLog({
        ip: String(
          request.headers['x-forwarded-for'] 
            // request?.remoteAddress,
        ),
        email: email,
        phone: phone,
        type: 'error',
        message: error,
        
        deviceInfo: request.headers['user-agent'] || '',
        userId: String(userId) || null,
      });
      return new HttpException(error?.toString(), HttpStatus.BAD_REQUEST);
    }
  }

  ////////////////////////forgot password///////////////

  async resetPassword({ token, password }) {
    try {
      const isTokenValid = await this.tokenRequestModel.findOne({
        token,
      });
       console.log('Token:', token); 
      if (!isTokenValid) {
        throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);
      }

      const findUser = await this.userModel.findById(isTokenValid.userId);
      if (!findUser) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }

      const hash = await this.generateHash(password);

      await this.userModel.findByIdAndUpdate(isTokenValid.userId, {
        password: hash,
      });

      await this.tokenRequestModel.findByIdAndDelete(isTokenValid._id);

      return {
        message: 'Password reset successfully.',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async forgetPasswordRequest(
    {
      email,
      phone,
    }: {
      email?: string;
      phone?: number;
    },
    request: Request,
  ) {
    if (!email && !phone)
      throw new HttpException(
        'Either email or phone is required',
        HttpStatus.BAD_REQUEST,
      );
    if (email && phone)
      throw new HttpException(
        'Either email or phone is required',
        HttpStatus.BAD_REQUEST,
      );

    if (email) email = email.toLowerCase();
    const payload = {
      softDelete: { $ne: true },
    };
    if (email) payload['email'] = email;
    if (phone) payload['phone'] = phone;

    const findUser = await this.userModel.findOne(payload);

    //  check if user has exceeded the password reset request limit in last 1 hour
    if (
      findUser &&
      findUser?.timestamps &&
      findUser.timestamps?.exceededPasswordResetRequest &&
      moment(findUser.timestamps?.exceededPasswordResetRequest).isAfter(
        moment().subtract(1, 'hour'),
      )
    )
      return new HttpException(
        `You have exceeded the password reset request limit. Please try again after ${
          60 -
          moment().diff(
            moment(findUser.timestamps?.exceededPasswordResetRequest),
            'minutes',
          )
        } minutes.`,
        HttpStatus.BAD_REQUEST,
      );

    if (findUser && email) {
      const prevToken = await this.tokenRequestModel
        .findOne({ userId: findUser._id }, '_id resendCount')
        .exec();

      //  check if user has exceeded the resend limit
      if (prevToken?.resendCount >= 3) {
        //  update the user with exceededPasswordResetRequest
        await this.userModel.findByIdAndUpdate(findUser._id, {
          'timestamps.exceededPasswordResetRequest': new Date(),
        });

        //  delete the old token
        await this.tokenRequestModel.findByIdAndDelete(prevToken._id);

        return new HttpException(
          'You have exceeded the resend limit',
          HttpStatus.BAD_REQUEST,
        );
      }

      try{
        await this.sendMailAndSaveInfo(
          new Types.ObjectId(findUser._id),
          email,
          prevToken?.resendCount || 0,
          request,
        );
      } catch(error){
        console.log(error)
      }

      if (prevToken) {
        await this.tokenRequestModel.findByIdAndDelete(prevToken._id);
      }

      return {
        message: 'Further details has been sent successfully on your mail...',
        userId: findUser._id,
      };
    } else if (findUser && phone) {
      await this.sendMessageToPhone(new Types.ObjectId(findUser._id), email);
      return { message: 'Further details sent successfully on your phone.' };
    } else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  async forgotPasswordRequestResend(userId: string, request: Request) {
    try {
      const findOldToken = await this.tokenRequestModel
        .findOne(
          {
            userId: new Types.ObjectId(userId),
          },
          '_id resendCount',
        )
        .exec();
      if (!findOldToken)
        return new HttpException(
          'Create new password reset request',
          HttpStatus.BAD_REQUEST,
        );

      const findUser = await this.userModel
        .findOne(
          {
            _id: new Types.ObjectId(userId),
            softDelete: { $ne: true },
          },
          'email timestamps',
        )
        .exec();

      //  check if user has exceeded the password reset request limit in last 1 hour
      if (
        findUser &&
        findUser?.timestamps &&
        findUser.timestamps?.exceededPasswordResetRequest &&
        moment(findUser.timestamps?.exceededPasswordResetRequest).isAfter(
          moment().subtract(1, 'hour'),
        )
      )
        return new HttpException(
          `You have exceeded the password reset request limit. Please try again after ${
            60 -
            moment().diff(
              moment(findUser.timestamps?.exceededPasswordResetRequest),
              'minutes',
            )
          } minutes.`,
          HttpStatus.BAD_REQUEST,
        );

      if (findOldToken?.resendCount >= 3) {
        await this.userModel.findByIdAndUpdate(userId, {
          'timestamps.exceededPasswordResetRequest': new Date(),
        });

        //  delete the old token
        await this.tokenRequestModel.findByIdAndDelete(findOldToken._id);

        return new HttpException(
          `You have exceeded the password reset request limit. Please try again after ${
            60 -
            moment().diff(
              moment(findUser.timestamps?.exceededPasswordResetRequest),
              'minutes',
            )
          } minutes.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.sendMailAndSaveInfo(
        new Types.ObjectId(userId),
        findUser.email,
        findOldToken.resendCount,
        request,
      );

      await this.tokenRequestModel.findByIdAndDelete(findOldToken._id);
      return {
        message: 'Further details has been sent successfully on your mail.',
        userId,
      };
    } catch (error) {
      console.log(error);
      return new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
    }
  }

  async sendMessageToPhone(userId: Types.ObjectId, phone: string) {
    try {
      console.log('UserId', userId);
      const otp = 778899;
      const requestToken = 'sdasdasdasdaoieqwepqwe';

      await new this.tokenRequestModel({
        userId,
        otp,
        timestamp: new Date(),
        requestToken,
      }).save();
      return requestToken;
    } catch (error) {
      console.log(error);
    }
  }

  async sendMailAndSaveInfo(
    userId: Types.ObjectId,
    email: string,
    resendCount?: number,
    request?: Request,
    newUser: boolean = false,
  ): Promise<Boolean> {
    try {
     
      this.createLoginAuditLog({
        logType: newUser ? 'new-user-password-reset' : 'password-reset',
        email: email,
        type: 'success',
        message: newUser
          ? 'New user created.\n'
          : '' +
            'Password reset request sent successfully.' +
            (resendCount > 0
              ? ` This is ${
                  resendCount + 1
                } token being resent, on user's request.`
              : ''),
        ip: String(
          request.headers['x-forwarded-for'] 
            // request?.connection?.remoteAddress,
        ),
        deviceInfo: String(request.headers['user-agent']) || '',
        userId: String(userId) || null,
      });

      const token = 'PASSWORD_RESET_' + uuid.v4();
      try {
        console.log("TOKEN ---------->    " + token)
        console.log("email---->", email);
        console.log("userId", userId);
        this.nodeMailerService.sendMail(emailTemplates.passwordReset({ email, token, userId: String(userId), newUser }));
      } catch (error) {
        console.log(error);
      }
      await this.tokenRequestModel.create({
        userId,
        token,
        resendCount: resendCount != null ? resendCount + 1 : 0,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //////////////////////////Get user list//////////////////////

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
}

  /////////////////////////////////////////////////////////////

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

  // async deactivatation(id: string): Promise<User> {
  //   const user = await this.userModel.findById(id);

  //   if (!user) {
  //     // Handle user not found
  //   }

  //   user.softDelete = true;
  //   user.deletedAt = new Date();

  //   await user.save();

  //   return user;
  // }

   async updateById(id: string, payload: Partial<UserModule>,
    ): Promise<UserModule> {
        return await this.userModel.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });

    }
/////////////////////////// new password ////////////////

async newPassword({ token, password }) {
  try {
    // Find the token in the database
    const isTokenValid = await this.tokenRequestModel.findOne({ token });

    if (!isTokenValid) {
      // If the token is not found, return an error
      throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);
    }

    // Find the user associated with the token
    const findUser = await this.userModel.findById(isTokenValid.userId);

    if (!findUser) {
      // If the user is not found, return an error
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    // Generate a hash for the new password (You need to implement the 'generateHash' function)
    const hash = await this.generateHash(password); // Corrected this line

    // Update the user's password with the new hash
    await this.userModel.findByIdAndUpdate(isTokenValid.userId, {
      password: hash,
    });

    // Delete the used token
    await this.tokenRequestModel.findByIdAndDelete(isTokenValid._id);

    return {
      message: 'Password reset successfully.',
    };
  } catch (error) {
    // Handle errors and log them
    console.log(error);
    throw new HttpException('Password reset failed', HttpStatus.BAD_REQUEST);
  }
}
}