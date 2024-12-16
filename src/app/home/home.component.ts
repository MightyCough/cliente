import { Component,OnInit } from '@angular/core';
import { AuthGuard } from '../../service/authGuard';
import { AuthService } from '../../service/auth';
import { ApiService } from '../../service/apiService';
import { VehiculoComponent } from '../vehiculo/vehiculo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private modalService: NgbModal, private router: Router){}

  abrirModalVehiculo() {
    this.modalService.open(VehiculoComponent, {
      centered: true, // Centrar el modal
      size: 'lg', // Tamaño del modal (opcional: sm, lg, xl)
      backdrop: 'static', // Prevenir cierre al hacer clic fuera del modal
      keyboard: true // Permitir cierre con tecla ESC
    });
  }

  // ! Método para redirigir a la página de vehiculo
  navVehiculo() {
    this.router.navigate(['/vehiculo']);
  }

  // ! Método para redirigir a la página de vendedor
  navVendedor() {
    this.router.navigate(['/vendedor']);
  }

  // ! Método para redirigir a la página de cliente
  navCliente() {
    this.router.navigate(['/clientes']);
  }

  // ! Método para redirigir a la página de cita
  navCita() {
    this.router.navigate(['/cita']);
  }
}
