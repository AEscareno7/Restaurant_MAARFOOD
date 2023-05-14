import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  reservedDates: { [key: string]: string[] } = {};
  reservations: any[] = [];
  today = new Date().toISOString().slice(0, 10);

  reservation = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    comments: '',
  };

  constructor() {
    this.reservedDates = JSON.parse(
      localStorage.getItem('reservedDates') ?? '{}'
    );
    this.reservations = JSON.parse(
      localStorage.getItem('reservations') ?? '[]'
    ); // inicializar la variable
  }

  timeOptions = [
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
  ];

  dateError = false;
  timeError = false;

  ngOnInit(): void {}

  onSubmit() {
    // Guardar la reserva en localStorage
    this.reservations.push(this.reservation); // agregar la reserva al arreglo
    localStorage.setItem('reservations', JSON.stringify(this.reservations)); // guardar el arreglo en localStorage

    // Actualizar las fechas reservadas
    const reservedTimes = this.reservedDates[this.reservation.date] || [];
    reservedTimes.push(this.reservation.time);
    this.reservedDates[this.reservation.date] = reservedTimes;
    localStorage.setItem('reservedDates', JSON.stringify(this.reservedDates));

    // Limpiar el formulario
    this.reservation = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      comments: '',
    };
  }

  checkReservation() {
    const reservedTimes = this.reservedDates[this.reservation.date] || [];

    // Verificar que la fecha no sea pasada
    const now = new Date();
    const selectedDate = new Date(this.reservation.date);
    if (selectedDate < now) {
      this.dateError = true;
      return;
    }

    // Verificar que no se haya reservado la hora
    if (reservedTimes.includes(this.reservation.time)) {
      this.timeError = true;
      return;
    }

    // Verificar que se haya seleccionado una hora válida
    if (!this.timeOptions.includes(this.reservation.time)) {
      this.timeError = true;
      return;
    }

    // Si todo es válido, quitar cualquier mensaje de error
    this.dateError = false;
    this.timeError = false;
  }

  isTimeOptionDisabled(timeOption: string): boolean {
    return this.reservedDates[this.reservation.date]?.includes(timeOption);
  }
}
