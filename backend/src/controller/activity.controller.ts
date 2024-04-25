import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateActivityDto } from 'src/dto/create-actividad.dto';
import { UserRole } from 'src/enum/user-role';
import { AuthGuard } from 'src/guards/auth.guard';
import { ActivityService } from 'src/service/actvity.service';



@Controller('/activity')
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
 }
