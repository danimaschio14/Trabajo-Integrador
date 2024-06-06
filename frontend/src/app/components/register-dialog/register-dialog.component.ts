import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ImportsForm } from './form.imports';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
import { RolesEnum } from '../../enums/roles.enum';
import { ToastModule } from 'primeng/toast';
import { UserStatus } from '../../enums/status.enum';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [ImportsForm],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss'
})

export class RegisterDialogComponent implements OnInit {
  visible: boolean = false;
  createEmpleado: FormGroup;
  submitted = false;
  id: string | null;
  titulo = "Agregar Usuario"

  constructor(
    private fb: FormBuilder,
    private empleadoService: UsuarioService,
    private router: Router, private aRoute: ActivatedRoute,
    private messageService: MessageService,
  
  ) {
    this.createEmpleado = this.fb.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      role: [RolesEnum.EMPLOYEE, Validators.required],
      status: [UserStatus.INACTIVE, Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }
  
  //Add action
  addEmpleado(){
    this.submitted = true
  
    if (this.createEmpleado.invalid) {
      return;
    }
  
    if (this.id === null) {
      this.agregarEmpleado();
    }
  }

  //Dialog
  showDialog() {
    this.visible = true;
  }
  closeDialog() {
    this.visible = false;
  }

  //Logic private for add user
  private agregarEmpleado(){
    const empleado: any = {
      name: this.createEmpleado.value.name,
      lastName: this.createEmpleado.value.lastName,
      email: this.createEmpleado.value.email,
      password: this.createEmpleado.value.password,
      role: this.createEmpleado.value.role,
      status: this.createEmpleado.value.status,
    }
  
    this.empleadoService.addUser(empleado).then(
      () => {
        this.messageService.addAll(
          [ { 
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'Se ha registrado un nuevo usuario',
        },
        { 
          severity: 'info',
          detail: '¡Bienvenido/a! Ahora sólo resta iniciar sesión...',
        }
      ]);
        setTimeout(() => {
          // this.router.navigate(['login']);
          this.closeDialog()
        }, 1000);
      },
      (error) => {
        if (error.status === 400) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al agregar empleado',
            detail: 'El servidor ha rechazado la solicitud. Verifica los datos ingresados o usuario ya existente .',
          });
        } else {
          console.error('Error desconocido:', error);
        }
      }
    );
  
  }


}





