export interface CitaPayload {
  cliente_id: number;
  vendedor_id: number;
  vehiculo_id: number;
  fecha_cita: Date;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  notas?: string;
}
