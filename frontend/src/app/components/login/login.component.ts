import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { RolesEnum } from '../../enums/roles.enum';
import { ToastModule } from 'primeng/toast'

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  selector: 'app-login',
  imports: [RegisterDialogComponent, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, ToastModule, RouterLink],
})
export class LoginComponent {
  form = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  });

  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  login() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Debe ingresar todos los campos',
      });
      return;
    }
    const formValue = this.form.getRawValue();
    this.authService
      .login(formValue.nombreUsuario!, formValue.clave!)
      .subscribe({
        next: (res) => {
          this.authService.setSession(res.token);
          if (this.authService.hasRole(RolesEnum.ADMIN)) {
            this.router.navigateByUrl('admin');
          } else {
            this.router.navigateByUrl('client');
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error al autenticar. Verifique el usuario y la clave',
          });
        },
      });
  }
}
