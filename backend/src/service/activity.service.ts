import { Criteria } from '../model/criteria.entity';
import { CreateActivityDto } from "src/dto/create-activity.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Activity } from "src/model/activity.entity";

@Injectable()
export class ActivityService {
    constructor(@InjectRepository(Activity) private activiyRepository : Repository<Activity>, 
        private readonly userService: UserService,
     ) {}

    async createActivity ( activityDto: CreateActivityDto) {
        const user = await this.userService.findOneById(activityDto.userId)
        const activity = new Activity (activityDto.name, activityDto.type, user) 
        return await this.activiyRepository.save(activity)
    }

    async getActivityById( id : number ) {
        const activity = await this.activiyRepository.findOne({
            where : {
                id
            }
        })

        if (!activity) {
            throw new BadRequestException(
              'There is no activity with id: ' + id,
            );
          }
          return activity;
    }
    
    async getActivityByCriteria( criteria : Criteria ) {
        let result
        if (criteria.activityId != null){
            result = await this.getActivityById(criteria.activityId)
        } 
       if (criteria.userId != null){
            result = await this.getActivityByUserId(criteria.userId)
        } 
        if (criteria.activityName != null){
            result = await this.getActivityByName(criteria.activityName)
        } 
        return result

    }


    //TODO : PENSAR EN DEVOLVER LISTA DE ACTIVIDADES DEL ID USER
    private async getActivityByUserId( id : number ) {
        let user = await this.userService.findOneById(id)
        if (!user) {
            throw new BadRequestException('User with id: ' + id+ ' not found in db')
          }
        let activities = []
        activities = await this.activiyRepository.findBy({ user: user })

        if (!activities.length) {
            throw new BadRequestException(
              'There is no activities with user id: ' + id,
            );
          }

          return activities;
    } 

    private async getActivityByName( name : string ) {
        const activity = await this.activiyRepository.findOne({
            where : {
                name: name
            }
        })

        if (!activity) {
            throw new BadRequestException(
              'There is no activity with name: ' + name,
            );
          }
          return activity;
    } 

}
