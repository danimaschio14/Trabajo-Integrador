import { Body, ParseIntPipe, Get, Param,Controller, Delete, Post, Patch, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Roles } from "src/decorators/roles.decorator";
import { CreatUserDto } from "src/dto/create-user.dto";
import { UserRole } from "src/enum/user-role";
import { AuthGuard } from "src/guards/auth.guard";
import { UserService } from "src/service/user.service";

@Controller("user")
export class UserController {
    constructor(private userService:UserService) {}

    @Get()
    getUsers(){
        return this.userService.getUsers()
    }

    @Get(":id")
    getUser(@Param("id",ParseIntPipe) id: number){
        let user = this.userService.getUser(id);
        if (!user) {
            return new HttpException("user not found", HttpStatus.NOT_FOUND)
          }
        return user
    }

    @Roles([UserRole.ADMIN])
    @UseGuards(AuthGuard)
    @Post()
    createUser(@Body() usuario :CreatUserDto){
        return this.userService.creatUser(usuario)
    }
    
    @Roles([UserRole.ADMIN])
    @UseGuards(AuthGuard)
    @Delete(":id")
    deleteUser(@Param("id",ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }

    @Roles([UserRole.ADMIN])
    @UseGuards(AuthGuard)
    @Patch(":id")
    updateUser(@Param("id",ParseIntPipe) id: number, @Body() {name ,lastName,email,password,role,status}: CreatUserDto){
       return this.userService.updateUser(id,{name ,lastName,email,password,role,status})
    }
    
}