import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivityService } from '../../services/activity.service';
import { NgFor } from '@angular/common';
import {DialogRecord} from '../activity-records/activity-record.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent, ButtonModule, NgFor, DialogRecord],
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

  exportToCSV() {
    //  const csvData = this.papa.unparse(this.activities)   ; // Convierte a CSV
    const csvData = this.activities.map(activity => {
      return `"titulo": ${activity.title}, "tipo": ${activity.type}, "prioridad": ${activity.priority}, "estado": ${activity.status}, "asignado a": ${activity.user}, "id": ${activity.id}`;
    }).join('\n'); // Convierte a CSV
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);


    // Crea un enlace de descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'actividades.csv';
    a.click();

    // Libera el objeto URL
    window.URL.revokeObjectURL(url);
  }
}
