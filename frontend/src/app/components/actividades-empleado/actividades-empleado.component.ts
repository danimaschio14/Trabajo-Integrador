import { Component, OnInit, ViewChild} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivityService } from '../../services/activity.service';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DialogRecord } from '../activity-records/activity-record.component';
import { MatInputModule } from '@angular/material/input';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent,
    ButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    RouterLink,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    ButtonGroupModule,
    ToolbarModule, ButtonModule, SplitButtonModule, InputTextModule],
  templateUrl: './actividades-empleado.component.html',
  styleUrl: './actividades-empleado.component.scss'
})

export class ActividadesEmployeeComponent implements OnInit {
  activities: any[]=[];
  constructor(
    private activityService:ActivityService,
    private messageService: MessageService,
  ){}

  displayedColumns: string[] = ['title', 'type', 'priority', 'status','acciones'];
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
      })
    })
  }

  updateStatus(id:number, status:string){
    this.activityService.updateStatus(id, status).subscribe((data) => {
      this.activities = [];
      this.getActivity();
      this.messageService.add({
        severity: 'info',
        summary: 'Actualizacion correcta',
        detail: data.msg,
      });
    });
  }
}
