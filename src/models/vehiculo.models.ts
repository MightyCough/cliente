export class Vehiculo {
  id?: number;
  marca!: string;
  modelo!: string;
  anio!: number;
  precio!: number;
  descripcion?: string;
  disponible!: boolean;

  constructor(init?: Partial<Vehiculo>) {
    Object.assign(this, init);
  }
}
