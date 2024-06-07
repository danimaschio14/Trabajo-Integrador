import { ActividadesEmployeeComponent } from './components/actividades-empleado/actividades-empleado.component';
import { BaseListaComponent } from './components/base-lista/base-lista.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { ListaUsuarioComponent } from './components/sin-uso/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { NuevaActividadComponent } from './components/create-actividad-nav/create-actividad-nav.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
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
    path: 'admin/usuarios',
    component: BaseListaComponent,
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
  // {
  //   path: 'usuarios',
  //   component: ListaUsuarioComponent,
  //   canActivate: [adminGuard],
  // },
  {
    path: 'create-usuario',
    component: CreateUsuarioComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'create-actividad',
    component: NuevaActividadComponent,
  },
  {
    path: 'edit-usuario/:id',
    component: CreateUsuarioComponent,
    canActivate: [adminGuard],
  },
  // {
  //   path: 'create-user',
  //   component: CreateEmpleadoComponent,
  // },
  {
    path: 'create-usuario-admin',
    component: NuevoUsuarioComponent,
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];
