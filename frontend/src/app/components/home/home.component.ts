import { BaseComponent } from '../base/base.component';
import { Component } from '@angular/core';
import { CarouselComponent } from '../carrusel/carrusel.component';
import { CardComponent } from '../card/card.component';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RolesEnum } from '../../enums/roles.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BaseComponent,CarouselComponent,CardComponent,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private authService: AuthService) { } 
  admin: boolean = this.authService.hasRole(RolesEnum.ADMIN);
  employee: boolean = this.authService.hasRole(RolesEnum.EMPLOYEE);
}
