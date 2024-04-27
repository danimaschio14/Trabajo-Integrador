import { Activity } from 'src/model/activity.entity';
import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivityDto } from 'src/dto/create-actividad.dto';
import { User } from 'src/model/user.entity';
import { ActivityStatus } from 'src/enum/activity.status';
import { UserService } from './user.service';
import { UserRole } from 'src/enum/user-role';
import { Criteria } from 'src/model/criteria.entity';
import { ActivityRecordService } from './activity.record.service';
import { CreateActivityDto2 } from 'src/dto/create-activity.dto';
import { CreateRecordDto } from 'src/dto/create-record.dto';
import { ActivityPriority } from 'src/enum/activity.priority';
import { UpdateActivityDto } from 'src/dto/update-activity.dto';
import { ActivityRecord } from 'src/model/activity.record.entity';


@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private activiyRepository: Repository<Activity>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => ActivityRecordService)) private recordService : ActivityRecordService
  ) {}

  async createActivity(createActivityDto: CreateActivityDto, user: User) {
    const activity: Activity = this.activiyRepository.create();
    activity.title = createActivityDto.description;
    //activity.status = ActivityStatus.CREATED;
    // activity.user = await this.userService.findOneById(
    //   createActivityDto.user,
    // );
    //activity.user = user;
    activity.user = user;
    await this.activiyRepository.save(activity);
  }

    async createActivity2 ( activityDto: CreateActivityDto2) {
    const user = await this.userService.findOneById(activityDto.userId)
    const activity = await this.activiyRepository.save(new Activity (activityDto.name, activityDto.type, user))
        
    //TODO: En record Created, el userID debe ser del admin que generó la actividad, según jwt login
    let recordDtoCreated = new CreateRecordDto(ActivityStatus.CREATED, ActivityPriority.NOT_ASIGNED, 'INICIO DE ACTIVIDAD', activityDto.userId, activity.id )
    await this.recordService.createRecord(recordDtoCreated)
    let recordDtoPending = new CreateRecordDto(ActivityStatus.PENDING, activityDto.priority, 'ASIGNADA', activityDto.userId, activity.id )
    await this.recordService.createRecord(recordDtoPending)
    return activity
}

  async getActivity(user: User): Promise<Activity[]> {
    const role:UserRole =  user.role;

    const consulta = this.activiyRepository
    .createQueryBuilder('activity')
    .innerJoin('activity.user', 'user');

    if(role === UserRole.EMPLOYEE){
        consulta.where('activity.status = :status',{
            estado: ActivityStatus.PENDING
        }).andWhere('user.id = :idUser',{
            idUsuario:user.id
        });
    }

    return await consulta.getMany();
  }

a
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


async updateActivity (id : number, dto : UpdateActivityDto){
  let activity = await this.getActivityById(id)
  if (dto.title || dto.type ){
    await this.activiyRepository.update({id},dto)
  } 
  else {
    //find last record 
    //let record = new ActivityRecord( dto.priority, dto.status : dto.status ? null , )
    //await this.recordService.createRecord(new ActivityRecord( dto.priority, dto.status ))
  }
  //record - 
  return null // UpdateActivityResponseDto con cambios y quien lo hizo?
}

async getActivityByCriteria( criteria : Criteria ) {
  let result
  if (criteria.activityId){
      result = await this.getActivityById(criteria.activityId)
  } 
 if (criteria.userId){
      result = await this.getActivityByUserId(criteria.userId)
  } 
  if (criteria.activityTitle){
      result = await this.getActivityByTitle(criteria.activityTitle)
  } 
  return result

}

private async getLastRecord( activityId : number){
  //buscar el ultimo registro y devolverlo
}

// //TODO : PENSAR EN DEVOLVER LISTA DE ACTIVIDADES DEL ID USER
private async getActivityByUserId( id : number ) {
    let user = await this.userService.findOneById(id)
    if (!user) {
        throw new BadRequestException('User with id: ' + id + ' not found in db')
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

private async getActivityByTitle( title : string ) {
    const activity = await this.activiyRepository.findOne({
        where : {
            title: title
        }
    })

    if (!activity) {
        throw new BadRequestException(
          'There is no activity with title: ' + title,
        );
      }
      return activity;
} 
}
