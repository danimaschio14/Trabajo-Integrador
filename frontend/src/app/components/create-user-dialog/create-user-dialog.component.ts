import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CreateUsuarioComponent } from '../create-usuario/create-usuario.component';


@Component({
  selector: 'create-user-dialog',
  standalone: true,
  imports: [BaseComponent, ReactiveFormsModule, RouterLink, NgIf, NgFor, ToastModule, DialogModule, ButtonModule, CreateUsuarioComponent],
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





