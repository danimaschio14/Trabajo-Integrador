import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRegistryDto } from "src/dto/create-registry.dto";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityStatus } from "src/enum/activity.status";
import { Registry } from "src/model/registry.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { ActivityService } from "./activity.service";

@Injectable()
export class RegistryService{
    constructor(@InjectRepository(Registry) registryRepository : Repository<Registry>,
                private userService : UserService,
                private activityService : ActivityService){}

    async createRegistry( dto : CreateRegistryDto){
    let user = await this.userService.getUser(dto.userId)
    if(!user){
        throw new BadRequestException(
            'User id is not valid',
          );
    }
    let activity = await this.activityService.getActivityById(dto.activityId)
    if(!activity){
        throw new BadRequestException(
            'activity id is not valid',
          );
    }
    // let registry = new Registry (
    //     ActivityStatus.CREATED,
    //     ActivityPriority.HIGH,
    //     dto.description,
    //     date,
    //     user,
    //     activity
    // )
    }

}