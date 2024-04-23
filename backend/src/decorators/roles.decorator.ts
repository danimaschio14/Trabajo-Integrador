import { Reflector } from "@nestjs/core";
import { UserRole } from "src/enum/user-role";



export const Roles = Reflector.createDecorator<UserRole[]>();