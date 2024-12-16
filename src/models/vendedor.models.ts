import { Vehiculo } from './vehiculo.models';

export class Vendedor {
  id?: number;
  nombre!: string;
  telefono?: string;
  vehiculos?: Vehiculo[]; // relación con vehículos

  constructor(init?: Partial<Vendedor>) {
    Object.assign(this, init);
  }
}
