import { ActividadesEmployeeComponent } from './components/actividades-empleado/actividades-empleado.component';
import { BaseListaComponent } from './components/base-lista/base-lista.component';
import { CreateBaseNavComponent } from './components/create-base-nav/create-base-nav.component';
import { CreateUsuarioComponent } from './components/sin-uso/create-usuario/create-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { employeeGuard } from './guards/employee.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterDialogComponent,
  },
  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/tareas',
    component: BaseListaComponent,
    canActivate: [adminGuard],
  }, 
  {
    path: 'admin/tareas/create',
    component: CreateBaseNavComponent,
    canActivate: [adminGuard],
  }, 
   {
    path: 'admin/usuarios',
    component: BaseListaComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/usuarios/create',
    component: CreateBaseNavComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'client',
    component: HomeComponent,
    canActivate: [employeeGuard]
  },
  {
    path: 'client/tareas',
    component: ActividadesEmployeeComponent,
    canActivate: [employeeGuard],
  },
  {
    path: 'create-actividad',
    component: CreateBaseNavComponent,
  },
  {
    path: 'edit-usuario/:id',
    component: CreateUsuarioComponent,
    canActivate: [adminGuard],
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];
