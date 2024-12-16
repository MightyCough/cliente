import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './cliente/cliente.component';


//Importaciones Primeng
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthInterceptor } from '../service/interceptor';
import { HomeComponent } from './home/home.component';
import { NavegationComponent } from './navegation/navegation.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { CitaComponent } from './cita/cita.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClienteComponent,
    HomeComponent,
    NavegationComponent,
    VendedorComponent,
    CitaComponent,
    VehiculoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    PanelModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    DialogModule,
    TriStateCheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
