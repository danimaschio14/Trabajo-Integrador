import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
import { RolesEnum } from '../../enums/roles.enum';
import { ToastModule } from 'primeng/toast';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-create-usuario-nav',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgIf,ToastModule,DropdownModule, ToastModule, DialogModule, ButtonModule ],
  templateUrl: './create-usuario-nav.component.html',
  styleUrl: './create-usuario-nav.component.scss'
})
export class CreateUsuarioNavComponent implements OnInit {
  createUsuario: FormGroup;
  submitted=false;
  id: string|null;
  titulo= "Agregar Usuario"
  boton="Agregar"
  status: any [] = []
  roles: any[] = []


  constructor(
    private fb: FormBuilder, 
    private usuarioService:UsuarioService, 
    private router:Router,private aRoute: ActivatedRoute,
    private messageService: MessageService,
  
    ) { 
      this.createUsuario= this.fb.group({
      name:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      role:["",Validators.required],
      status:["",Validators.required],
    })
    this.id= this.aRoute.snapshot.paramMap.get('id');
    this.status = [
      {label: 'Activo', value: 'ACTIVE'},
      {label: 'Inactivo', value: 'INACTIVE'}
    ]
    this.roles = [
      {label: 'Administrador', value: RolesEnum.ADMIN},
      {label: 'Empleado', value: RolesEnum.EMPLOYEE}
    ]
  }
  ngOnInit(): void {
    this.llenarFormulario()
  }

  addEditUsuario(){
    this.submitted=true

    if (this.createUsuario.invalid) {
      return;
    } 

    if (this.id===null) {
      this.agregarUsuario();
    }else{
      this.editUsuario(this.id);
    }
  }

  editUsuario(id:string){
    const idEmpleado : number= parseInt(id)
    const empleado: any ={
      name:this.createUsuario.value.name,
      lastName:this.createUsuario.value.lastName,
      email:this.createUsuario.value.email,
      password:this.createUsuario.value.password,
      role:this.createUsuario.value.role,
      status:this.createUsuario.value.status,
    }
    this.usuarioService.editUser(idEmpleado,empleado).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario editado con éxito',
        detail: 'El usuario se ha editado correctamente.',
       
      });
      setTimeout(() => {
        this.router.navigate(['/admin/usuarios']);
      }, 1000);
    },
    (error) => {
      if (error.status === 400) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al editar usuario',
          detail: 'Revisa los campos nuevamente.',
        });
      } else {
        console.error('Error desconocido:', error);
      }
      }); 
  }

  agregarUsuario(){
    const empleado: any ={
      name:this.createUsuario.value.name,
      lastName:this.createUsuario.value.lastName,
      email:this.createUsuario.value.email,
      password:this.createUsuario.value.password,
      role:this.createUsuario.value.role,
      status:this.createUsuario.value.status,
    }
    this.usuarioService.addUser(empleado).then(() => {
      this.messageService.add({
        severity: 'success', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Usuario agregado con éxito',
        detail: 'El usuario se ha registrado correctamente.',
       
      });

      setTimeout(() => {
        this.router.navigate(['/admin/usuarios']);
      }, 1000);
       
      },
      (error) => {
        if (error.status === 400) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al agregar usuario',
            detail: 'El email ya existe o el formato no permitido.',
          });
        } else {
          console.error('Error desconocido:', error);
        }
      }
    );
  }

  llenarFormulario(){
    if(this.id!==null){
      this.titulo="Editar Usuario"
      this.boton="Editar"
      const idEmpleado : number= parseInt(this.id)
      this.usuarioService.getUser(idEmpleado).subscribe(data =>{
        this.createUsuario.setValue({
          name : data["name"],
          lastName : data["lastName"],
          email : data["email"],
          password: "",
          role : data["role"],
          status  :data["status"]
        })
      })
    }
  }
  
}
