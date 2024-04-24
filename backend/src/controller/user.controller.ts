import { Body, ParseIntPipe, Get, Param,Controller, Delete, Post, Patch } from "@nestjs/common";
import { CreatUserDto } from "src/dto/create-user.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";
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
        return this.userService.getUser(id);
    }
    
    @Post()
    createUser(@Body() usuario :CreatUserDto){
        return this.userService.creatUser(usuario)
    }
    
    @Delete(":id")
    deleteUser(@Param("id",ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }

    @Patch(":id")
    updateUser(@Param("id",ParseIntPipe) id: number, @Body()user:UpdateUserDto){
        return this.userService.updateUser(id,user)
    }

}