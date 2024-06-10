import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { BaseComponent } from '../base/base.component';
import { ButtonModule } from 'primeng/button';
import { CreateUsuarioComponent } from '../create-usuario/create-usuario.component';
import { DialogModule } from 'primeng/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'create-user-dialog',
  standalone: true,
  imports: [MatButtonModule,MatTooltipModule,BaseComponent, ReactiveFormsModule, RouterLink, NgIf, NgFor, ToastModule, DialogModule, ButtonModule, CreateUsuarioComponent],
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})

export class CreateUserdDialog implements OnInit{
  visible: boolean = false;
  title: string = "Crear Usuario";
  btnText: string = "Agregar";

  @Input() userId:number = 0;

  constructor() {}
  ngOnInit(): void {
    if(this.userId != 0){
      this.title = "Editar Usuario"
      this.btnText = "Editar";
    }}

  showDialog() {
    this.visible = true;
  }
}





