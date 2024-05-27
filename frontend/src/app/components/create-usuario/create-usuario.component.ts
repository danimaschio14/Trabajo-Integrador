import { Component,OnInit} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UsuarioService } from '../../services/usuario.service';



@Component({
  selector: 'app-create-usuario',
  standalone: true,
  imports: [BaseComponent,ReactiveFormsModule,RouterLink,NgIf,ToastModule],
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})

export class CreateUsuarioComponent implements OnInit{
  createUsuario: FormGroup;
  submitted=false;
  id: string|null;
  titulo= "Agregar Usuario"
  boton="Agregar"


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
  }
  ngOnInit(): void {
    this.editEmpleado()
  }

  addEditEmpleado(){
    this.submitted=true

    if (this.createUsuario.invalid) {
      return;
    } 

    if (this.id===null) {
      this.agregarEmpleado();
    }else{
      this.editEmployee(this.id);
    }
  }

  editEmployee(id:string){
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
      this.router.navigate(["usuarios"])  
      });
  }

  agregarEmpleado(){
    const empleado: any ={
      name:this.createUsuario.value.name,
      lastName:this.createUsuario.value.lastName,
      email:this.createUsuario.value.email,
      password:this.createUsuario.value.password,
      role:this.createUsuario.value.role,
      status:this.createUsuario.value.status,
    }
    this.usuarioService.addUser(empleado).then(() => {
      // this.router.navigate(["usuarios"]),
      this.messageService.add({
        severity: 'success', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Uusuario agregado con éxito',
        detail: 'El usuario se ha registrado correctamente.',
       
      });

      setTimeout(() => {
        this.router.navigate(['usuario']);
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

  editEmpleado(){
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





