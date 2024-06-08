import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { ImportsList } from './lista.imports';
import { ConfirmacionDialogComponent } from '../confirm-dialog/confirmacion-dialog.component';
import { RolesEnum } from '../../enums/roles.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [ImportsList],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit {
  empleados: any[]=[];
  @Input() title : String = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService : UsuarioService,
    private messageService : MessageService,
    private authService : AuthService,
    public dialog : MatDialog,
  ){}

  displayedColumns: string[] = ['name', 'lastName', 'email', 'role', 'status', 'options'];
  dataSource = new MatTableDataSource<any>;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.getUsuarios()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  getUsuarios(){
    this.usuarioService.getAllUsers().subscribe(data => {
      data.forEach((element: any) =>{      
        this.empleados.push({element,...element})
        this.dataSource=new MatTableDataSource(this.empleados)
        this.ngAfterViewInit()
      }
    )
    })
  }

  deleteUsuario(idUsuario: number) {
    const dialogRef = this.dialog.open(ConfirmacionDialogComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // El usuario confirmó la eliminación
        this.usuarioService.deleteUser(idUsuario).subscribe(() => {
          this.empleados = [];
          this.getUsuarios();
          this.messageService.add({
            severity: 'info',
            summary: 'Usuario eliminado con éxito',
            detail: 'El usuario se ha eliminado correctamente.',
          });
        });
      } else {
      }
    });
  }

}
