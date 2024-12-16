import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AuthGuard } from '../service/authGuard';
import { HomeComponent } from './home/home.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { CitaComponent } from './cita/cita.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';


const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path: 'clientes',component:ClienteComponent, canActivate: [AuthGuard]},
  {path: 'home',component:HomeComponent},
  {path: 'vendedor',component:VendedorComponent, canActivate: [AuthGuard]},
  {path: 'cita',component:CitaComponent, canActivate: [AuthGuard]},
  {path: 'vehiculo',component:VehiculoComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Redirección al cargar la aplicación
  { path: '**', redirectTo: 'auth/login' } // Redirección en caso de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
