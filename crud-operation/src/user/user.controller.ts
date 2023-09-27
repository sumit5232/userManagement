import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from "./role.guard";
// import { Roles } from "./role.decorator";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/view')
    async getAllUser(): Promise<User[]>{
        return this.userService.findAll()
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('username')
  getUserByUsername(@Param() param) {
    return this.userService.getUserByUsername(param.username);
  }

    @Post('/add')
    async createUser(
        @Body()
        createUserDto: CreateUserDto
    ): Promise<User> {
        return this.userService.registerUser(createUserDto);
    }

    @Get(':id')
    async getUser(
        @Param('id')
        id: string
    ): Promise<User>{
        return this.userService.findById(id)
    }

    @Put(':id')
    async updateUser(
        @Param('id')
        id:string,
        @Body()
        createUserDto: UpdateUserDto
    ): Promise<User> {
        return this.userService.updateById(id,  createUserDto);
    }

    @Delete(':id')
    async deleteBook(
        @Param('id') 
        id: string
    ): Promise<User>{
        return this.userService.deleteById(id)
    }

    @Post(':id/true')
    async activate(@Param('id') id: string): Promise<User> {
      return await this.userService.activate(id);
    }
  
    @Post(':id/false')
    async deactivate(@Param('id') id: string): Promise<User> {
      return await this.userService.deactivate(id);
    }

    // @Get()
    // @Roles('superadmin')
    // @UseGuards(RolesGuard)
    // async getAllUsersForSuperAdmin() {
    //   return await this.userService.findAll();
    // }



  
    // @Get()
    // @Roles('admin')
    // @UseGuards(RolesGuard)
    // async getAllUsersForAdmin() {
    //   return await this.userService.find({ role: { $ne: 'superadmin' } });
    // }
}
// function AuthGuard(arg0: string): Function | import("@nestjs/common").CanActivate {
//     throw new Error("Function not implemented.");
// }
