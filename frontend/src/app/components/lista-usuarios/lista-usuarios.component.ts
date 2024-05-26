import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { MessageService } from 'primeng/api';
import { BaseComponent } from '../base/base.component';
import { RouterLink } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [BaseComponent,MatFormFieldModule, MatInputModule,MatTableModule,MatPaginatorModule,
    MatSortModule,MatIconModule,RouterLink,MatTooltipModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuarioComponent implements OnInit {
  empleados: any[]=[];  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


    constructor(
      private usuarioService:UsuarioService,
      private messageService: MessageService
    ){}



  displayedColumns: string[] = ['name', 'lastName', 'email', 'role', 'status', 'options'];
  dataSource = new MatTableDataSource<any>;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.getEmpleados()
      }

  applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
  } 
  getEmpleados(){
    this.usuarioService.getAllUsers().subscribe(data => {
      data.forEach((element: any) =>{      
        this.empleados.push({element,...element})
        this.dataSource=new MatTableDataSource(this.empleados)
        this.ngAfterViewInit()
      }
    )
    })
  }

  deleteEmpleado(idUsuario: number) {
    this.usuarioService.deleteUser(idUsuario).subscribe(() => {
      this.empleados=[], this.getEmpleados()
      this.messageService.add({
        severity: 'info', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Usuario eliminado con éxito',
        detail: 'El usuario se ha eliminado correctamente.',
      });
     
    });
  }
}