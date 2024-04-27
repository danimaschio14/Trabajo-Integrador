import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateActivityDto } from 'src/dto/create-actividad.dto';
import { CreateActivityDto2 } from 'src/dto/create-activity.dto';
import { UpdateActivityDto } from 'src/dto/update-activity.dto';
import { UserRole } from 'src/enum/user-role';
import { AuthGuard } from 'src/guards/auth.guard';
import { Criteria } from 'src/model/criteria.entity';
import { ActivityService } from 'src/service/activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  // @ApiBearerAuth()
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard)
  @Post()
  async createActivity(
    @Req() request: Request,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    await this.activityService.createActivity(
      createActivityDto,
      request['user'],
    );
  }

  // @ApiBearerAuth()
  @Roles([UserRole.ADMIN,UserRole.EMPLOYEE])
  @UseGuards(AuthGuard)
  @Get()
  async getActividades(@Req()request : Request){
    return await this.activityService.getActivity(request['user']); 
  }

    @Roles([UserRole.ADMIN,UserRole.EMPLOYEE])
    @UseGuards(AuthGuard)
    @Get(":id")
    getActivity (@Param("id",ParseIntPipe) id: number ) {
        return this.activityService.getActivityById(id)
    }

    @Roles([UserRole.ADMIN,UserRole.EMPLOYEE])
    @UseGuards(AuthGuard)
    @Get("criteria")
    getActivitiesByCriteria (@Body() criteria : Criteria ) {
        return this.activityService.getActivityByCriteria(criteria)
    }

    @Roles([UserRole.ADMIN])
    @UseGuards(AuthGuard)
    @Post("create")
    createActivity2 (@Body() activityDto : CreateActivityDto2){
        return this.activityService.createActivity2(activityDto)
    }

    //@Roles([UserRole.ADMIN])
    //@UseGuards(AuthGuard)
    @Patch(":id")
    updateActivity (@Param("id", ParseIntPipe) id: number, @Body() updateActivityDto : UpdateActivityDto){
      return this.activityService.updateActivity(id, updateActivityDto)
    }

}