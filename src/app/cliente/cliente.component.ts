import { Component,OnInit,EventEmitter,Output } from '@angular/core';
import { AuthGuard } from '../../service/authGuard';
import { AuthService } from '../../service/auth';
import { ApiService } from '../../service/apiService';
import { Cliente } from '../../models/cliente.models';
import { ConfirmationService,MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../../models/vehiculo.models';




@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers:[AuthService, ApiService, ConfirmationService, MessageService ]
})
export class ClienteComponent {

  constructor(private auth:AuthService, private api:ApiService, private conf: ConfirmationService, private msg:MessageService ){}
  @Output() ClienteCreado = new EventEmitter<any>();

  clientes: Cliente[];
  nuevaCli:Cliente = new Cliente();
  value: boolean | null = null;
  visible:boolean = false;
  edicion:boolean = false;
  tituloDialogo:string = "";

  cargarCliente(){
    this.api.getClientes().subscribe(res => {
      this.clientes = res;
    });
  }
  ngOnInit(){
    this.cargarCliente();
  }


  verDialogo(){
    this.visible = true;
    this.nuevaCli = new Cliente();
    this.edicion = false;
    this.tituloDialogo="Crear Cliente";
  }

  guardarCliente(){
    this.conf.confirm({
      message: 'Deseas continuar?',
      header: 'Confirmar Operación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        if (this.edicion) {
          this.api.putCliente(this.nuevaCli).subscribe(res => {
            console.log(res);
            this.cargarCliente();
            this.visible = false;
          });
        } else {
          this.api.postCliente(this.nuevaCli).subscribe(res => {
            console.log(res);
            this.cargarCliente();
            this.visible = false;
          });
        }
      }
    });
  }

  eliminarCliente(cliente:Cliente){
    this.conf.confirm({
      message: 'Deseas continuar con la eliminación de ' + cliente.nombre + '?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.api.deleteCliente(cliente).subscribe(() => {
          this.cargarCliente();
          this.msg.add({ severity: 'info', summary: 'Eliminado!', detail: 'El registro ha sido eliminado' });
        });
      }
    });
  }

  editarCliente(cliente:Cliente){
    this.nuevaCli = cliente;
    this.visible = true;
    this.edicion = true;
    this.tituloDialogo="Editar Vehiculo";
  }



  logout(){
    this.auth.logout();
  }
}
