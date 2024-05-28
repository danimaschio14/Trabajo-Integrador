
import { LoginComponent } from './components/login/login.component';
import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';
import { ActividadesEmployeeComponent } from './components/actividades-empleado/actividades-empleado.component';
import { ListaUsuarioComponent } from './components/lista-usuarios/lista-usuarios.component';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';

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
  path: 'edit-usuario/:id',
  component: CreateUsuarioComponent,
  canActivate: [adminGuard],
  },
  {
    path: 'create-empleado',
    component: CreateEmpleadoComponent,
    },
  {
    path: '**',
    redirectTo:'login'
  },

];
