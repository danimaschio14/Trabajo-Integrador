import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { EmpleadoService } from '../../services/empleado.service';
import { NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-lista-usuario',
  standalone: true,
  imports: [BaseComponent,CardModule,NgFor,RouterLink,ToastModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuarioComponent implements OnInit {
  empleados: any[]=[];
  constructor(
    private empreadoService:EmpleadoService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.gerEmpleados()
  }

  gerEmpleados(){
    this.empreadoService.getAllUsers().subscribe(data => {
      data.forEach((element: any) =>{      
        this.empleados.push({element,...element})
      }
    )
    })
  }

  deleteEmpleado(idUsuario: number) {
    this.empreadoService.deleteUser(idUsuario).subscribe(() => {
      this.empleados=[], this.gerEmpleados()
      this.messageService.add({
        severity: 'info', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Usuario eliminado con éxito',
        detail: 'El usuario se ha eliminado correctamente.',
      });
     
    });
  }

}
