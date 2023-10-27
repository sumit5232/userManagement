import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Req } from "@nestjs/common";
import { SignInSignUpDto } from "./dto/user.property";
import { UserService } from "./user.service";
import * as yup from 'yup';
// import { request } from "http";

import { Request } from 'express';
import { UpdatePasswordDto } from "./dto/updatePassword.dto";
import { UserModule } from "./user.module";


const signUpSchema = yup.object({
    phone: yup.number().min(10000000).max(9999999999),
    email: yup.string().email(),
    // password: yup
    // .string()
    // .required()
    // .min(8, 'Password must be 8 character')
    // .max(24, 'Password must be lower than 24 character')
    // .matches(/[A-Z]/,'Must contain one uppercase')
    // .matches(/[a-z]/, 'Must contain one lowercase')
    // .matches(/(\d)/, "Must contain one number")
    // .matches(/(\w)/, 'Must contain one special character'),
});

const passwordResetSchema = yup.object({
    password: yup
      .string()
      .required()
      .min(8, 'Password must be 8 character')
      .max(24, 'Password must be lower than 24 character')
      .matches(/[A-Z]/, 'Must contain one uppercase')
      .matches(/([a-z])/, 'Must contain one lowercase')
      .matches(/(\d)/, 'Must contain one number')
      .matches(/(\W)/, 'Must contain one special character'),
    confirmPassword: yup
      .string()
      .required()
      .min(8, 'Password must be 8 character')
      .max(24, 'Password must be lower than 24 character')
      .matches(/[A-Z]/, 'Must contain one uppercase')
      .matches(/([a-z])/, 'Must contain one lowercase')
      .matches(/(\d)/, 'Must contain one number')
      .matches(/(\W)/, 'Must contain one special character'),
  });

@Controller('user')
export class UserController{
    constructor(private userService: UserService){}

    @Get('view')
    async getAllUser(){
        return this.userService.findAll()
    }


    
    @Post('signup')
    async signUp(@Body() payload: SignInSignUpDto) {
        try{
            await signUpSchema.validate({ ...payload });
            return await this.userService.createUser({...payload });
        }catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('update-password')
     updateUserPassword(@Body() payload) {
     return this.userService.updateUserPassword(payload.email, payload.password);
}

@Post('password-reset-request')
  async passwordResetRequest(
    @Req() request: Request, 
    @Body() payload: { email?: string; phone?: number },
  ) {
    return await this.userService.forgetPasswordRequest(payload, request);
  }

@Post('password-reset/:token')
async passwordReset(
  @Body() payload: { password: string; confirmPassword: string },
  @Param('token') token: string,
) {
  try {
    if (
      !payload.password ||
      !payload.confirmPassword ||
      payload.password !== payload.confirmPassword
    )
      throw new HttpException(
        'Password and Confirm Password must be same',
        HttpStatus.BAD_REQUEST,
      );


    await passwordResetSchema.validate({ ...payload });
        console.log("Helo------------")
    return await this.userService.resetPassword({
      token,
      password: payload.password,
    });
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
}

@Put(':id')
async updateUser(
    @Param('id')
    id:string,
    @Body()
    payload: Partial<UserModule>
    // createUserDto: UpdateUserDto
){
    return this.userService.updateById(id,  payload);
}


@Post(':id/true')
    async activate(@Param('id') id: string) {
      return await this.userService.activate(id);
    }
  
    @Post(':id/false')
    async deactivate(@Param('id') id: string){
      return await this.userService.deactivate(id);
    }
    // @Post('signin')
    // async signIn(@Req() request: Request, @Body() payload: SignInSignUpDto){
    //  return await this.userService.signIn({ ...payload }, request);
    // }

    @Post('new-password/:token')
    async newpassword(
      @Body() payload: { password: string; confirmPassword: string },
      @Param('token') token: string,
    ) {
      try {
        if (
          !payload.password ||
          !payload.confirmPassword ||
          payload.password !== payload.confirmPassword
        )
          throw new HttpException(
            'Password and Confirm Password must be the same',
            HttpStatus.BAD_REQUEST,
          );
    
        await passwordResetSchema.validate({ ...payload });
    
        return await this.userService.newPassword({
          token,
          password: payload.password,
        });
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
    
}