import { BaseComponent } from '../base/base.component';
import { Component } from '@angular/core';
import { ListaTareasComponent } from '../lista-tareas/lista-tareas.component';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';
import { NgIf } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-lista',
  standalone: true,
  imports: [BaseComponent,ListaUsuariosComponent,NgIf, ListaTareasComponent],
  templateUrl: './base-lista.component.html',
  styleUrl: './base-lista.component.scss'
})
export class BaseListaComponent implements OnInit{
  title : String = "Listado ";
  prop : String = "";
  isValid : boolean = false;
  
 constructor(router: Router) {
  const state: String = router.routerState.snapshot.url;
  const url : String = state.split( '/')[2]
  this.title = this.title.concat(' de ' + url)
  this.prop = url;
 }
 
  ngOnInit(): void {
    if(this.prop == 'usuarios'){
      this.isValid= true
    }
  }
 
}
