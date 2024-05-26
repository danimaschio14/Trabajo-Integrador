import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivityService } from '../../services/activity.service';
import { NgFor } from '@angular/common';
import {DialogRecord} from '../activity-records/activity-record.component';
@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent, NgFor, DialogRecord],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss'
})

export class ActividadesAdminComponent implements OnInit {
  activities: any[]=[];
  constructor(
    private activityService:ActivityService,
    // private messageService: MessageService
  ){}

  ngOnInit(): void {
   this.getActivity()
  }

  getActivity(){
    this.activityService.getAllActivity().subscribe(data => {
      data.forEach((element: any) =>{
        this.activities.push({element,...element})
      }
    )
    })
  }
}
