import { Activity } from 'src/model/activity.entity';
import { BadRequestException, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
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
import { ActivityType } from 'src/enum/activity.type';


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
    await this.activiyRepository.save(activity);
  }

    async createActivity2 ( activityDto: CreateActivityDto2, userAdminId: number) {
    const activity = await this.activiyRepository.save(new Activity (activityDto.title, activityDto.type))

    const recordDtoCreated = new CreateRecordDto(ActivityStatus.CREATED, ActivityPriority.NOT_ASIGNED, "INICIO DE ACTIVIDAD", userAdminId, activity.id)
    await this.recordService.createRecord(recordDtoCreated)
    const recordDtoPending = new CreateRecordDto(ActivityStatus.PENDING, activityDto.priority, "", activityDto.userId, activity.id)
    await this.recordService.createRecord(recordDtoPending)
    return activity
}

  async getActivity(user: User): Promise<Activity[]> {
    let activities = await this.activiyRepository.find();
    let index = 0;
    for (const activity of [...activities]) {
      const lastRecord = await this.recordService.getLastRecord(activity);
      if(lastRecord.user.id != user.id && user.role == UserRole.EMPLOYEE){
        activities.splice(index, 1);
      } else {
        ++index;
      }
    }
    return activities
  }

async getActivityById( id : number ) :Promise<Activity>{
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

async updateActivity (id : number, dto : UpdateActivityDto, userId: number){
	let activity = await this.getActivityById(id)
	let lastRecord:ActivityRecord = await this.recordService.getLastRecord(activity);
	const user:User = await this.userService.getUser(userId);
	if(user.role == UserRole.EMPLOYEE && (user.id != lastRecord.user.id || lastRecord.status != ActivityStatus.PENDING))
		throw new UnauthorizedException("No esta asignado a esta actividad o la actividad no esta en estado PENDING");

	if (dto.title || dto.type){
		await this.createRecordActivityUpdate(activity, dto.title, dto.type, user.id);
	}

	if (dto.priority || dto.status || dto.userId){
		await this.createRecordUpdate(dto, lastRecord, user.id);
	}

	return "Se han actualizado los campos";
}

async createRecordActivityUpdate (activity : Activity, title : string, type : ActivityType, userId: number){
	let msg:string = "";
	if(title && title != activity.title ){
		msg += "CAMBIO DE TITULO '" + activity.title + "', ";
		activity.title = title
	}

	if(type && type != activity.type ){
		msg += "CAMBIO DE TIPO '" + activity.type + "', ";
		activity.type = type
	}

	msg = msg.slice(0, msg.lastIndexOf(", "));

	if(msg){
		await this.activiyRepository.update(activity.id, activity)
		const changeRecord = new CreateRecordDto(ActivityStatus.UPDATE, ActivityPriority.NOT_ASIGNED, msg, userId, activity.id)
		await this.recordService.createRecord(changeRecord)
	}
}

async createRecordUpdate(dto : UpdateActivityDto, lastRecord:ActivityRecord, userId: number){
	let msg:string = "";
	let record = new CreateRecordDto(lastRecord.status, lastRecord.priority, "", lastRecord.user.id, lastRecord.activity.id)

	if(dto.priority && dto.priority != lastRecord.priority){
		msg += "CAMBIO DE PRIORIDAD, ";
		record.priority = dto.priority;
	}

	if(dto.userId && dto.userId != lastRecord.user.id){
		msg += "CAMBIO DE USUARIO, ";
		record.userId = dto.userId;
	}

	if(dto.status && dto.status != lastRecord.status){
		msg += "CAMBIO DE ESTADO, ";
		record.status = dto.status;
	}

	msg = msg.slice(0, msg.lastIndexOf(", "));
	if(msg){
		const changeRecord = new CreateRecordDto(ActivityStatus.UPDATE, ActivityPriority.NOT_ASIGNED, msg, userId, lastRecord.activity.id)
		await this.recordService.createRecord(changeRecord)
		await this.recordService.createRecord(record)
	}
}

// NO ESTÁ SIENDO UTILIZADO.
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

private async getActivityByUserId( id : number ) {
    let user = await this.userService.findOneById(id)
    if (!user) {
        throw new BadRequestException('User with id: ' + id + ' not found in db')
      }
    let activities = []
    //activities = await this.activiyRepository.findBy({ user: user })

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
