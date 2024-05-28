import { Component, ViewChild } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ImportsHeader } from './header.imports';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ 
    ImportsHeader
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent{
  constructor(private authService: AuthService) {}

  cerrarSesion() {
    this.authService.logout();
  }

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  closeCallback(e: any): void {
      this.sidebarRef.close(e);
  }
  sidebarVisible: boolean = false;
}