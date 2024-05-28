import { Component, ViewChild } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ImportsHeader } from './header.imports';
import { NgIf } from '@angular/common';
import { RolesEnum } from '../../enums/roles.enum';
import { RouterLink } from '@angular/router';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, ImportsHeader],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent{
  constructor(private authService: AuthService) {}
  admin: boolean = this.authService.hasRole(RolesEnum.ADMIN);

  cerrarSesion() {
    this.authService.logout();
  }

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  closeCallback(e: any): void {
      this.sidebarRef.close(e);
  }
  sidebarVisible: boolean = false;
}