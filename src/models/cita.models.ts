import { Cliente } from './cliente.models';
import { Vendedor } from './vendedor.models';
import { Vehiculo } from './vehiculo.models';

export class Cita {
  id?: number;
  cliente!: Cliente | number; // Puede ser un objeto o un ID
  vendedor!: Vendedor | number; // Puede ser un objeto o un ID
  vehiculo!: Vehiculo | number; // Puede ser un objeto o un ID
  fecha_cita!: Date;
  notas?: string;
  estado!: 'pendiente' | 'confirmada' | 'cancelada';

  constructor(init?: Partial<Cita>) {
    Object.assign(this, init);
  }
}


