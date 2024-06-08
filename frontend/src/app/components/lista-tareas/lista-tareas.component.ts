import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ImportsList } from '../lista-usuarios/lista.imports';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityService } from '../../services/activity.service';
import { ImportsListTareas } from './lista.tareas.imports';

@Component({
  selector: 'app-lista-tareas',
  standalone: true,
  imports: [ImportsListTareas],
  templateUrl: './lista-tareas.component.html',
  styleUrl: './lista-tareas.component.scss'
})
export class ListaTareasComponent implements OnInit {
  activities: any[]=[];
  @Input() title : String = ""; 

  constructor(
    private activityService:ActivityService,
    //private dialog : CreateActividadDialog
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
    //this.dialog.visible = false;
    this.getActivity()
  }

  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getActivity(){
    this.activityService.getAllActivity().subscribe((data: any[]) => {
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


  // showDialog() {
  //   this.dialog.visible = true;
  // }

  
}
