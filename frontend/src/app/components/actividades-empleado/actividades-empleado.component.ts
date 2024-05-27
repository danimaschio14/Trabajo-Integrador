import { Component, OnInit} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivityService } from '../../services/activity.service';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent, NgFor, ButtonModule, ButtonGroupModule],
  templateUrl: './actividades-empleado.component.html',
  styleUrl: './actividades-empleado.component.scss'
})

export class ActividadesEmployeeComponent implements OnInit {
  activities: any[]=[];
  constructor(
    private activityService:ActivityService,
    private messageService: MessageService,
    private router:Router
  ){}

  ngOnInit(): void {
   this.getActivity()
  }

  getActivity(){
    this.activityService.getAllActivity().subscribe(data => {
      data.forEach((element: any) =>{
        this.activities.push({element,...element})
      })
    })
  }

  updateStatus(id:number, status:string){
    this.activityService.updateStatus(id, status).subscribe((data) => {
      this.activities = [];
      this.getActivity();
      this.messageService.add({
        severity: 'info', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Actualizacion correcta',
        detail: data.msg,
      });
    });
  }
}
