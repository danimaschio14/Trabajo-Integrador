import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';
import { ActividadesEmployeeComponent } from './components/actividades-empleado/actividades-empleado.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { ListaUsuarioComponent } from './components/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { NuevaActividadComponent } from './components/create-actividad-nav/create-actividad-nav.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { employeeGuard } from './guards/employee.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: ActividadesAdminComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'client',
    component: ActividadesEmployeeComponent,
    canActivate: [employeeGuard],
  },
  {
    path: 'usuarios',
    component: ListaUsuarioComponent,
    canActivate: [adminGuard],
  },
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
  {
    path: 'create-empleado',
    component: CreateEmpleadoComponent,
  },
  {
    path: 'create-usuario-admin',
    component: NuevoUsuarioComponent,
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];
