import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../../models/vehiculo.models';
import {  OnInit } from '@angular/core';
import { AuthGuard } from '../../service/authGuard';
import { AuthService } from '../../service/auth';
import { ApiService } from '../../service/apiService';
import { ConfirmationService,MessageService } from 'primeng/api';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css'],
  providers: [AuthService, ApiService, ConfirmationService, MessageService ]
})
export class VehiculoComponent {
  vehiculoForm: FormGroup;
  constructor(private auth:AuthService, private api:ApiService, private conf: ConfirmationService, private msg:MessageService ){}
  @Output() vehiculoCreado = new EventEmitter<any>();

  tipos: Vehiculo[];
  nuevaTipo:Vehiculo = new Vehiculo();
  value: boolean | null = null;
  visible:boolean = false;
  edicion:boolean = false;
  tituloDialogo:string = "";

  cargarTipos(){
    this.api.getVehiculo().subscribe(res => {
      this.tipos = res;
    });
  }
  ngOnInit(){
    this.cargarTipos();
  }


  verDialogo(){
    this.visible = true;
    this.nuevaTipo = new Vehiculo();
    this.edicion = false;
    this.tituloDialogo="Crear Vehiculo";
  }

  guardarTipo(){
    this.conf.confirm({
      message: 'Deseas continuar?',
      header: 'Confirmar Operación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        if (this.edicion) {
          this.api.putVehiculo(this.nuevaTipo).subscribe(res => {
            console.log(res);
            this.cargarTipos();
            this.visible = false;
          });
        } else {
          this.api.crearVehiculo(this.nuevaTipo).subscribe(res => {
            console.log(res);
            this.cargarTipos();
            this.visible = false;
          });
        }
      }
    });
  }

  eliminarVehiculo(tipo:Vehiculo){
    this.conf.confirm({
      message: 'Deseas continuar con la eliminación de ' + tipo.modelo + '?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.api.deleteVehiculo(tipo).subscribe(() => {
          this.cargarTipos();
          this.msg.add({ severity: 'info', summary: 'Eliminado!', detail: 'El registro ha sido eliminado' });
        });
      }
    });
  }

  editarTipo(tipo:Vehiculo){
    this.nuevaTipo = tipo;
    this.visible = true;
    this.edicion = true;
    this.tituloDialogo="Editar Vehiculo";
  }

  logout(){
    this.auth.logout();
}
}
