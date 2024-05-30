import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import {CreateActividad} from '../create-actividad/create-actividad.component'

@Component({
  selector: 'create-activity-dialog',
  standalone: true,
  imports: [BaseComponent, ReactiveFormsModule, RouterLink, NgIf, NgFor, ToastModule, DialogModule, ButtonModule, CreateActividad],
  templateUrl: './create-actividad-dialog.component.html',
  styleUrls: ['./create-actividad-dialog.component.scss']
})

export class CreateActividadDialog implements OnInit{
  visible: boolean = false;
  title: string = "Crear Actividad";
  btnText: string = "Agregar";

  @Input() activityId:number = 0;

  constructor() {}
  ngOnInit(): void {
    if(this.activityId != 0){
      this.title = "Editar Actividad"
      this.btnText = "Editar";
    }}

  showDialog() {
    this.visible = true;
  }
}





