import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthGuard } from '../../service/authGuard';
import { AuthService } from '../../service/auth';
import { ApiService } from '../../service/apiService';
import { Cliente } from '../../models/cliente.models';
import { Vendedor } from '../../models/vendedor.models';
import { Vehiculo } from '../../models/vehiculo.models';
import { Cita } from '../../models/cita.models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CitaPayload } from '../../models/cita-payload.models';


@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
  providers: [AuthService, ApiService, ConfirmationService, MessageService],
})
export class CitaComponent implements OnInit {
  @Output() citaCreada = new EventEmitter<any>();

  citas: Cita[] = [];
  clientes: Cliente[] = [];
  vendedores: Vendedor[] = [];
  vehiculos: Vehiculo[] = [];

  nuevaCit: Cita = new Cita();
  value: boolean | null = null;
  visible: boolean = false;
  edicion: boolean = false;
  tituloDialogo: string = '';

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private conf: ConfirmationService,
    private msg: MessageService
  ) {}

  ngOnInit() {
    this.cargarCitas();
    this.cargarRelaciones();
  }

  cargarCitas() {
    this.api.getCitas().subscribe((res) => {
      this.citas = res;
    });
  }

  cargarRelaciones() {
    this.api.getClientes().subscribe((res) => (this.clientes = res));
    this.api.getVendedores().subscribe((res) => (this.vendedores = res));
    this.api.getVehiculo().subscribe((res) => (this.vehiculos = res));
  }

  verDialogo() {
    this.visible = true;
    this.nuevaCit = new Cita();
    this.edicion = false;
    this.tituloDialogo = 'Crear Cita';
  }

  guardarCita() {
    const clienteId = typeof this.nuevaCit.cliente === 'number' ? this.nuevaCit.cliente : this.nuevaCit.cliente?.id;
    const vendedorId = typeof this.nuevaCit.vendedor === 'number' ? this.nuevaCit.vendedor : this.nuevaCit.vendedor?.id;
    const vehiculoId = typeof this.nuevaCit.vehiculo === 'number' ? this.nuevaCit.vehiculo : this.nuevaCit.vehiculo?.id;

    if (!clienteId || !vendedorId || !vehiculoId) {
      console.error('Todos los campos deben estar completos');
      return;
    }

    const citaPayload: CitaPayload = {
      cliente_id: clienteId,
      vendedor_id: vendedorId,
      vehiculo_id: vehiculoId,
      fecha_cita: this.nuevaCit.fecha_cita,
      estado: this.nuevaCit.estado,
      notas: this.nuevaCit.notas
    };

    console.log('Payload enviado:', citaPayload);

    this.api.crearCita(citaPayload).subscribe({
      next: (res) => {
        console.log('Cita creada:', res);
        this.cargarCitas();
        this.visible = false;
      },
      error: (err) => {
        console.error('Error al crear cita:', err);
      }
    });
  }



  eliminarCita(cita: Cita) {
    this.conf.confirm({
      message: `¿Deseas continuar con la eliminación de la cita con estado "${cita.estado}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.api.deleteCita(cita).subscribe(() => {
          this.cargarCitas();
          this.msg.add({
            severity: 'info',
            summary: 'Eliminado',
            detail: 'La cita ha sido eliminada',
          });
        });
      },
    });
  }

  editarCita(cita: Cita) {
    this.nuevaCit = { ...cita }; // Crear una copia para evitar mutaciones
    this.visible = true;
    this.edicion = true;
    this.tituloDialogo = 'Editar Cita';
  }

  logout() {
    this.auth.logout();
  }
}
