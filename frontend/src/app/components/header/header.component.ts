import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { NgIf} from '@angular/common';
import { RolesEnum } from '../../enums/roles.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent{
  constructor(private authService: AuthService) {}
  admin: boolean = this.authService.hasRole(RolesEnum.ADMIN);

  cerrarSesion() {
    this.authService.logout();
  }
}
