import { Component,OnInit} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-create-empleado',
  standalone: true,
  imports: [BaseComponent,ReactiveFormsModule,RouterLink,NgIf,ToastModule],
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.scss']
})

export class CreateEmpleadoComponent implements OnInit{
  createEmpleado: FormGroup;
  submitted=false;
  id: string|null;
  titulo= "Agregar Usuario"


  constructor(
    private fb: FormBuilder, 
    private empleadoService:EmpleadoService, 
    private router:Router,private aRoute: ActivatedRoute,
    private messageService: MessageService,
  
    ) { 
      this.createEmpleado= this.fb.group({
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

    if (this.createEmpleado.invalid) {
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
      name:this.createEmpleado.value.name,
      lastName:this.createEmpleado.value.lastName,
      email:this.createEmpleado.value.email,
      password:this.createEmpleado.value.password,
      role:this.createEmpleado.value.role,
      status:this.createEmpleado.value.status,
    }
    this.empleadoService.editUser(idEmpleado,empleado).then(() => {
      this.router.navigate(["usuarios"])  
      });
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
    this.empleadoService.addUser(empleado).then(() => {
      this.router.navigate(["usuarios"]),
      this.messageService.add({
        severity: 'success', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Empleado agregado con éxito',
        detail: 'El empleado se ha registrado correctamente.',
      });
      
      });
  }

  editEmpleado(){
    if(this.id!==null){
      this.titulo="Editar Usuario"
      const idEmpleado : number= parseInt(this.id)
      this.empleadoService.getUser(idEmpleado).subscribe(data =>{
        this.createEmpleado.setValue({
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





