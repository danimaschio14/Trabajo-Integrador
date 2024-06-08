import { BaseComponent } from '../base/base.component';
import { Component } from '@angular/core';
import { CreateTareaComponent } from '../create-tarea/create-tarea.component';

@Component({
  selector: 'app-create-base-nav',
  standalone: true,
  imports: [BaseComponent, CreateTareaComponent],
  templateUrl: './create-base-nav.component.html',
  styleUrl: './create-base-nav.component.scss'
})
export class CreateBaseNavComponent {

}
