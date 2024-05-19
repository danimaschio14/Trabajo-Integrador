
import { LoginComponent } from './components/login/login.component';
import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';
import { ListaUsuarioComponent } from './components/lista-usuarios/lista-usuarios.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import {Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: ActividadesAdminComponent,
  },
  {
  path: 'usuarios',
  component: ListaUsuarioComponent,
  },
  {
  path: 'create-empleado',
  component: CreateEmpleadoComponent,
  },
  {
  path: 'edit-empleado/:id',
  component: CreateEmpleadoComponent,
  },
  {
    path: '**',
    redirectTo:'login'
  },
];
