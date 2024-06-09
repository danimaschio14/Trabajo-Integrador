import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../base/base.component';
import { CreateTareaComponent } from '../create-tarea/create-tarea.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-base-nav',
  standalone: true,
  imports: [BaseComponent, CreateTareaComponent, NgIf],
  templateUrl: './create-base-nav.component.html',
  styleUrl: './create-base-nav.component.scss'
})
export class CreateBaseNavComponent implements OnInit {
  title: String = "Añadir ";
  url: String = "";
  isTarea : boolean = false;

  constructor(router: Router) {
    const state: String = router.routerState.snapshot.url;
    this.url = state.split('/')[2]
  }

  ngOnInit(): void {
    this.url == 'tareas' ? this.title = this.title.concat('tarea') : this.title = this.title.concat('usuario')
    this.url == 'tareas' ? this.isTarea = true : this.isTarea;
  }
}
