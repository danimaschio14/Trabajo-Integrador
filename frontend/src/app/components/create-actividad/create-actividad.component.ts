import { MessageService } from 'primeng/api';
import { Component,Input,OnInit} from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ActivityService } from '../../services/activity.service';
import { UsuarioService } from '../../services/usuario.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CreateActividadDialog } from '../create-actividad-dialog/create-actividad-dialog.component';

@Component({
  selector: 'create-activity',
  standalone: true,
  imports: [BaseComponent, ReactiveFormsModule, NgIf, NgFor, ToastModule, DialogModule, ButtonModule, CreateActividadDialog],
  templateUrl: './create-actividad.component.html',
  styleUrls: ['./create-actividad.component.scss']
})

export class CreateActividad implements OnInit{
  usuarios: any[]=[]
  createActividad: FormGroup;
  submitted=false;
  titulo= "Agregar Tarea"
  @Input() id:number = 0;

  constructor(

    private fb: FormBuilder,
    private actividadService:ActivityService,
    private router: Router,
    private usuarioService: UsuarioService,
    private messageService:MessageService,
    private dialog : CreateActividadDialog

    ) {
      this.createActividad= this.fb.group({
      title:["",Validators.required],
      type:["",Validators.required],
      priority:["",Validators.required],
      status:[""],
      user:["",Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadActividad()
    this.getUsers()
  }

  addEditActividad(){
    this.submitted = true;
    if (this.createActividad.invalid) {
      return;
    }

    if (this.id===0) {
      this.agregarActividad();
    }else{
      this.editarActividad(this.id);
    }

  }

  editarActividad(id:number){
    const actividad: any ={
      title : this.createActividad.value.title,
      type : this.createActividad.value.type,
      priority : this.createActividad.value.priority,
      status : this.createActividad.value.status,
      userId : Number(this.createActividad.value.user)
    }

    this.actividadService.updateActivity(id, actividad).then((data) => {
      this.messageService.add({
        severity: 'success', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Actividad agregada con éxito',
        detail: 'La actividad se ha registrado correctamente.',
      });
      this.closeForm()
      this.refrescarPagina()
      }, (error) => {
          console.error('Error desconocido:', error);
      }
    );
  }

  agregarActividad(){
    const actividad: any ={
      title : this.createActividad.value.title,
      type : this.createActividad.value.type,
      priority : this.createActividad.value.priority,
      userId : Number(this.createActividad.value.user)
    }
    this.actividadService.addActivity(actividad).then((data) => {
      // this.router.navigate(["usuarios"]),
      this.messageService.add({
        severity: 'success', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Actividad agregada con éxito',
        detail: 'La actividad se ha registrado correctamente.',
      });
      this.closeForm()
      this.refrescarPagina()
      }, (error) => {
        this.messageService.add({
          severity: 'error', // Puedes usar 'success', 'info', 'warn' o 'error'
          summary: 'Hubo un ERROR',
          detail: error.error.message,
        });      }
    );
  }

  loadActividad(){
    if(this.id !== 0){
      this.titulo = "Editar Actividad"
      this.actividadService.getActivity(this.id).subscribe(data =>{
        this.createActividad.setValue({
          title : data["title"],
          type : data["type"],
          priority : data["priority"],
          status : data["status"],
          user : data["user"].id
        })
      })
    }
  }

  getUsers(){
    this.usuarioService.getAllUsers().subscribe(data => {
      data.forEach((element: any) =>{
        this.usuarios.push({element,...element})
      })
    })
  }

  closeForm(){
    this.dialog.visible = false;
  }

  refrescarPagina() {
    location.reload();
  }

}




