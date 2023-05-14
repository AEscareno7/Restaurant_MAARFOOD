export interface Reservacion {
  [key: string]: any;
  folio: number;
  nombre: string;
  sucursal: string;
  fecha: Date;
  hora: string;
  mesa: number;
  email: string;
  telefono: string;
  comentario: string;
}



export interface Sucursal {
  id: number;
  sucursal: string;
  nombre?: string;

}

export interface Horario {
  horario: string;
  disponible: boolean;
}


