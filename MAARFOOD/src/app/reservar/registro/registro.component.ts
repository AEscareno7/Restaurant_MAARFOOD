import { Component, OnInit } from '@angular/core';
import { Reservacion, Sucursal } from '../reservacion.model';
import { ReservarService } from '../reservar.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  reservar!: Reservacion;
  sucursal!: Sucursal[];
  submitted = false;
  nombre = new FormControl('', Validators.required);
  constructor(private reservarService: ReservarService) {}

  ngOnInit() {
    this.reservar = this.reservarService.nuevaReservacion();
    this.sucursal = this.reservarService.getSucursal();
  }

  nuevaReservacion(): void {
    this.reservarService.agregarReservacion(this.reservar);
    this.reservar = this.reservarService.nuevaReservacion();
  }

  onSubmit() {
    this.submitted = true;

    if (this.reservar.nombre && this.reservar.email && this.reservar.telefono) {
      this.nuevaReservacion();
      Swal.fire(
        '¡Reservación exitosa!',
        'Gracias por reservar con nosotros',
        'success'
      );
    } else {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
    }
  }
}
