import { BaseComponent } from '../base/base.component';
import { Component } from '@angular/core';
import { CreateActividad } from '../create-actividad/create-actividad.component';

@Component({
  selector: 'app-create-actividad-nav',
  standalone: true,
  imports: [CreateActividad, BaseComponent],
  templateUrl: './create-actividad-nav.component.html',
  styleUrl: './create-actividad-nav.component.scss'
})
export class NuevaActividadComponent {

}
