import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

import { ActivityService } from '../../services/activity.service';
import { BaseComponent } from '../base/base.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-create-tarea',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, ToastModule, DialogModule, ButtonModule],
  templateUrl: './create-tarea.component.html',
  styleUrl: './create-tarea.component.scss'
})
export class CreateTareaComponent implements OnInit {
  submitted = false;
  createActividad: FormGroup;
  usuarios: any[] = []

  constructor(
    private fb: FormBuilder,
    private actividadService: ActivityService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,

  ) {
    this.createActividad = this.fb.group({
      title: ["", Validators.required],
      type: ["", Validators.required],
      priority: ["", Validators.required],
      status: [""],
      user: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.getUsers()
  }

  addEditActividad() {
    this.submitted = true;
    if (this.createActividad.invalid) {
      return;
    }
    this.agregarActividad();
  }

  getUsers() {
    this.usuarioService.getAllUsers().subscribe(data => {
      data.forEach((element: any) => {
        this.usuarios.push({ element, ...element })
      })
    })
  }

  agregarActividad() {
    const actividad: any = {
      title: this.createActividad.value.title,
      type: this.createActividad.value.type,
      priority: this.createActividad.value.priority,
      userId: Number(this.createActividad.value.user)
    }
    this.actividadService.addActivity(actividad).then((data) => {
      // this.router.navigate(["usuarios"]),
      this.messageService.add({
        severity: 'success', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Actividad agregada con éxito',
        detail: 'La actividad se ha registrado correctamente.',
      });
      this.refrescarPagina()
    }, (error) => {
      this.messageService.add({
        severity: 'error', // Puedes usar 'success', 'info', 'warn' o 'error'
        summary: 'Hubo un ERROR',
        detail: error.error.message,
      });
    }
    );
  }

  refrescarPagina() {
    location.reload();
  }
}
