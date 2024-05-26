import { Component,OnInit} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { RolesEnum } from '../../enums/roles.enum';
import { UserStatus } from '../../enums/status.enum';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PrincipioComponent } from '../principio/principio.component';



@Component({
  selector: 'app-create-empleado',
  standalone: true,
  imports: [PrincipioComponent, BaseComponent,ReactiveFormsModule,RouterLink,NgIf,ToastModule],
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.scss'],
})

export class CreateEmpleadoComponent implements OnInit{
  createEmpleado: FormGroup;
  submitted=false;
  id: string|null;
  titulo= "Agregar Usuario"


  constructor(
    private fb: FormBuilder, 
    private empleadoService:UsuarioService, 
    private router:Router,private aRoute: ActivatedRoute,
    private messageService: MessageService,
  
    ) { 
      this.createEmpleado= this.fb.group({
      name:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      role:[RolesEnum.EMPLOYEE,Validators.required],
      status:[UserStatus.INACTIVE,Validators.required],
    })
    this.id= this.aRoute.snapshot.paramMap.get('id');    
  }
  ngOnInit(): void {
  }

  addEmpleado(){
    this.submitted=true

    if (this.createEmpleado.invalid) {
      return;
    } 

    if (this.id===null) {
      this.agregarEmpleado();
  }
  }
 
  agregarEmpleado(){
    const empleado: any ={
      name:this.createEmpleado.value.name,
      lastName:this.createEmpleado.value.lastName,
      email:this.createEmpleado.value.email,
      password:this.createEmpleado.value.password,
      role:this.createEmpleado.value.role,
      status:this.createEmpleado.value.status,
    }
   
  this.empleadoService.addUser(empleado).then(
    () => {
      this.router.navigate(['login']);
      this.messageService.add({
        severity: 'success',
        summary: 'Empleado agregado con éxito',
        detail: 'El empleado se ha registrado correctamente.',
      });
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