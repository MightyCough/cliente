import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cliente } from '../models/cliente.models';
import { Vehiculo } from "../models/vehiculo.models";
import { Vendedor } from "../models/vendedor.models";
import { Cita } from "../models/cita.models";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private ApiUrl = "http://127.0.0.1:8000/api/"; // URL to web API
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}

  // !CLIENTE
  public getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.ApiUrl + "clientes");
  }

  public postCliente(cliente:Cliente):Observable<Cliente>{
    let cuerpo = JSON.stringify(cliente);
    return this.http.post<Cliente>(this.ApiUrl + "clientes", cuerpo, this.httpOptions);
  }

  public deleteCliente(cliente:Cliente):Observable<void>{
    return this.http.delete<void>(this.ApiUrl + "clientes" + cliente.id + '/');
  }

  public putCliente(cliente: Cliente):Observable<Cliente>{
    let cuerpo = JSON.stringify(cliente);
    return this.http.put<Cliente>(this.ApiUrl + 'clientes' + cliente.id + '/', cuerpo ,this.httpOptions)
  }

  // !VENDEDOR
  public getVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.ApiUrl + "vendedores");
  }

  public postVendedor(vendedor:Vendedor):Observable<Vendedor>{
    let cuerpo = JSON.stringify(vendedor);
    return this.http.post<Vendedor>(this.ApiUrl + "vendedores", cuerpo, this.httpOptions);
  }

  public deleteVendedor(vendedor:Vendedor):Observable<void>{
    return this.http.delete<void>(this.ApiUrl + "vendedores" + vendedor.id + '/');
  }

  public putVendedor(vendedor: Vendedor):Observable<Vendedor>{
    let cuerpo = JSON.stringify(vendedor);
    return this.http.put<Vendedor>(this.ApiUrl + 'vendedores' + vendedor.id + '/', cuerpo ,this.httpOptions)
  }

  // !VEHÍCULO
  public getVehiculo(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.ApiUrl + "vehiculos");
  }

  public crearVehiculo(tipo: Vehiculo): Observable<Vehiculo> {
    let cuerpo = JSON.stringify(tipo)
    return this.http.post<Vehiculo>(this.ApiUrl + "vehiculos", cuerpo, this.httpOptions);
  }

  public deleteVehiculo(tipo:Vehiculo):Observable<void>{
    return this.http.delete<void>(this.ApiUrl + "vehiculos" + tipo.id + '/')
  }

  public putVehiculo(tipo: Vehiculo):Observable<Vehiculo>{
    let cuerpo = JSON.stringify(tipo);
    return this.http.put<Vehiculo>(this.ApiUrl + 'vehiculos' + tipo.id + '/', cuerpo ,this.httpOptions)
  }

  // !CITA
  public getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.ApiUrl + "citas");
  }

  public crearCita(cita: Cita): Observable<Cita> {
    let cuerpo = JSON.stringify(cita)
    return this.http.post<Cita>(this.ApiUrl + "citas", cuerpo, this.httpOptions);
  }

  public deleteCita(cita:Cita):Observable<void>{
    return this.http.delete<void>(this.ApiUrl + "citas" + cita.id + '/')
  }

  public putCita(cita: Cita):Observable<Cita>{
    let cuerpo = JSON.stringify(cita);
    return this.http.put<Cita>(this.ApiUrl + 'citas' + cita.id + '/', cuerpo ,this.httpOptions)
  }
}
