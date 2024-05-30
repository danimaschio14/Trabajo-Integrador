import { BaseComponent } from '../base/base.component';
import { Component } from '@angular/core';
import { CreateUsuarioComponent } from '../create-usuario/create-usuario.component';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [CreateUsuarioComponent, BaseComponent],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.scss'
})
export class NuevoUsuarioComponent {
}
