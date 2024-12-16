export class Cliente
{
  id?:number;
  nombre!:string;
  apellidos!:string;
  email!:string;
  telefono!:number;
  direccion?:string;
  fecha_registro?:Date;

  constructor(init?: Partial<Cliente>) {
    Object.assign(this, init);
  }
}
