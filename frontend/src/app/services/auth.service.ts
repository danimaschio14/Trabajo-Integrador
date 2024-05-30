import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private client: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.client.post<{ token: string }>('http://localhost:3000/auth/login', {
      email,
      password,
    });
  }

  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !new JwtHelperService().isTokenExpired(token);
  }

  hasRole(rol: RolesEnum): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }

    return new JwtHelperService().decodeToken(token).rol === rol;
  }

  getUserId() : number | null {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return null
    }
    return new JwtHelperService().decodeToken(token).sub;
  }
  
}
