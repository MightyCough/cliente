import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../service/auth';
import { ApiService } from '../../service/apiService';
import { Vendedor } from '../../models/vendedor.models';
import { Vehiculo } from '../../models/vehiculo.models';



@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css'],
  providers: [AuthService, ApiService, ConfirmationService, MessageService],
})
export class VendedorComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private api: ApiService,
    private conf: ConfirmationService,
    private msg: MessageService
  ) {}

  @Output() vendedorCreado = new EventEmitter<any>();

  vendedores: Vendedor[] = [];
  vehiculos: Vehiculo[] = []; // lista de vehículos disponibles
  nuevaVen: Vendedor = new Vendedor();
  visible: boolean = false;
  edicion: boolean = false;
  tituloDialogo: string = '';

  ngOnInit(): void {
    this.cargarVendedores();
    this.cargarVehiculos();
  }

  cargarVendedores() {
    this.api.getVendedores().subscribe((res) => {
      this.vendedores = res;
    });
  }

  cargarVehiculos() {
    this.api.getVehiculo().subscribe((res) => {
      this.vehiculos = res;
    });
  }

  verDialogo() {
    this.visible = true;
    this.nuevaVen = new Vendedor();
    this.nuevaVen.vehiculos = []; // inicializamos la lista de vehículos seleccionados
    this.edicion = false;
    this.tituloDialogo = 'Crear Vendedor';
  }

  guardarVendedor() {
    this.conf.confirm({
      message: '¿Deseas continuar?',
      header: 'Confirmar Operación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        if (this.edicion) {
          this.api.putVendedor(this.nuevaVen).subscribe((res) => {
            console.log(res);
            this.cargarVendedores();
            this.visible = false;
          });
        } else {
          this.api.postVendedor(this.nuevaVen).subscribe((res) => {
            console.log(res);
            this.cargarVendedores();
            this.visible = false;
          });
        }
      },
    });
  }

  eliminarVendedor(vendedor: Vendedor) {
    this.conf.confirm({
      message: `¿Deseas continuar con la eliminación de ${vendedor.nombre}?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.api.deleteVendedor(vendedor).subscribe(() => {
          this.cargarVendedores();
          this.msg.add({
            severity: 'info',
            summary: 'Eliminado',
            detail: 'El registro ha sido eliminado',
          });
        });
      },
    });
  }

  editarVendedor(vendedor: Vendedor) {
    this.nuevaVen = { ...vendedor }; // hacemos una copia del vendedor para editar
    this.visible = true;
    this.edicion = true;
    this.tituloDialogo = 'Editar Vendedor';
  }

  logout() {
    this.auth.logout();
  }
}
