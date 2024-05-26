
import { LoginComponent } from './components/login/login.component';
import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';
import { ListaUsuarioComponent } from './components/lista-usuarios/lista-usuarios.component';

import {Routes } from '@angular/router';
import { CreateUsuarioComponent } from './components/create-usuario/create-usuario.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { adminGuard } from './guards/admin.guard';

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
