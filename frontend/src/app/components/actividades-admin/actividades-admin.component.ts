import { Component, OnInit, ViewChild } from "@angular/core";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BaseComponent } from "../base/base.component";
import { ActivityService } from "../../services/activity.service";
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {DialogRecord} from '../activity-records/activity-record.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent,MatButtonModule,MatFormFieldModule,MatInputModule,MatTableModule,RouterLink,MatIconModule,MatTooltipModule, MatSortModule,DialogRecord,MatPaginatorModule],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss'
})

export class ActividadesAdminComponent implements OnInit {
  activities: any[]=[];
  constructor(
    private activityService:ActivityService,
  ){}


  displayedColumns: string[] = ['title', 'type', 'priority', 'status', 'user', 'registry'];
  dataSource = new MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
      this.getActivity()
      }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getActivity(){
    this.activityService.getAllActivity().subscribe(data => {
      data.forEach((element: any) =>{
        this.activities.push({element,...element})
        this.dataSource=new MatTableDataSource(this.activities)
        this.ngAfterViewInit()
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