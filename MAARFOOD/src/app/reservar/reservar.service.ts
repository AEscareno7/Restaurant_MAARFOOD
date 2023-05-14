import { Injectable } from '@angular/core';
import {Reservacion, Sucursal, Horario} from './reservacion.model';
import { SUCURSAL } from './sucursal';

@Injectable()

export class ReservarService {
  private reservar: Reservacion[];
  private sucursal: Sucursal[] = SUCURSAL;
  public errors = {
    nombre: false,
    email: false
  };

  constructor() {
    const data = localStorage.getItem('data');
    this.reservar = data ? JSON.parse(data) : [];
  }
  

   getSucursal() {
    return this.sucursal;
   }


   getReservar() {
    return this.reservar;
   }

   agregarReservacion(Reservacion: Reservacion) {
    this.reservar.push(Reservacion);
    localStorage.setItem('data', JSON.stringify(this.reservar));
  }

  nuevaReservacion(): Reservacion{
    return{
      folio: this.reservar.length,
      nombre: '',
      sucursal: '',
      fecha: new Date(),
      hora: '',
      mesa: 0,
      email: '',
      telefono: '',
      comentario: '',
    };
  }
  
}