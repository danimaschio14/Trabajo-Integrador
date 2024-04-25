import { Injectable } from '@nestjs/common';
import { Activity } from 'src/model/activity.entity';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivityDto } from 'src/dto/create-actividad.dto';
import { User } from 'src/model/user.entity';
import { ActivityStatus } from 'src/enum/activity.status';
import { UserService } from './user.service';
import { UserRole } from 'src/enum/user-role';


@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private activityRepo: Repository<Activity>,
    private userService: UserService,
  ) {}

  async createActivity(createActivityDto: CreateActivityDto, user: User) {
    const activity: Activity = this.activityRepo.create();
    activity.description = createActivityDto.description;
    activity.status = ActivityStatus.CREATED;
    // activity.user = await this.userService.findOneById(
    //   createActivityDto.user,
    // );
    activity.user = user;
    await this.activityRepo.save(activity);
  }

  async getActivity(user: User): Promise<Activity[]> {
    const role:UserRole =  user.role;

    const consulta = this.activityRepo
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
}
