import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { BaseComponent } from '../base/base.component';
import { ButtonModule } from 'primeng/button';
import {CreateActividad} from '../create-actividad/create-actividad.component'
import { DialogModule } from 'primeng/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'create-activity-dialog',
  standalone: true,
  imports: [MatButtonModule,MatTooltipModule,BaseComponent, ReactiveFormsModule, RouterLink, NgIf, NgFor, ToastModule, DialogModule, ButtonModule, CreateActividad],
  templateUrl: './create-actividad-dialog.component.html',
  styleUrls: ['./create-actividad-dialog.component.scss']
})

export class CreateActividadDialog implements OnInit{
  visible: boolean = false;
  title: string = "Crear tarea";
  btnText: string = "Agregar";

  @Input() activityId:number = 0;

  constructor() {}
  ngOnInit(): void {
    if(this.activityId != 0){
      this.title = "Editar tarea"
      this.btnText = "Editar";
    }}

  showDialog() {
    this.visible = true;
  }
}





