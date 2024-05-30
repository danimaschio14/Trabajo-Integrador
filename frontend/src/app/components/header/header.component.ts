import { Component, OnInit, ViewChild } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ImportsHeader } from './header.imports';
import { NgIf } from '@angular/common';
import { ParseIntPipe } from '@nestjs/common';
import { RolesEnum } from '../../enums/roles.enum';
import { RouterLink } from '@angular/router';
import { Sidebar } from 'primeng/sidebar';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf, ImportsHeader],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{
  user : any 
  url = "/admin"

  constructor(private authService: AuthService, private userService : UsuarioService) {}
  admin : boolean = this.authService.hasRole(RolesEnum.ADMIN);

  ngOnInit(): void {
    this.getUserSession()
    if( this.authService.hasRole( RolesEnum.EMPLOYEE )) {
      this.url = "/client"
    }
   }

   getUserSession(){
    let id = this.authService.getUserId()

    if (id !== null ) {
    this.userService.getUserById(id).then( 
      data => {
          this.user = data
        }
      )
    } else {
      this.authService.logout()
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  closeCallback(e: any): void {
      this.sidebarRef.close(e);
  }
  sidebarVisible: boolean = false;
}