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

  firstNameValid: boolean = false;
  lastNameValid: boolean = false;
  emailValid: boolean = false;
  phoneValid: boolean = false;

  firstNameTouched: boolean = false;
  lastNameTouched: boolean = false;
  emailTouched: boolean = false;
  phoneTouched: boolean = false;

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
    //Se reciben los datos de Fecha y hora
    this.reservedDates = JSON.parse(
      localStorage.getItem('reservedDates') ?? '{}'
    );
    //Se recibe la informacion personal
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

    // Mostrar notificación de éxito
    Swal.fire({
      icon: 'success',
      title: 'Reserva exitosa',
      text: 'Gracias por reservar con nosotros.',
    });
  }

  
  checkFirstName() {
    const regex = /^[a-zA-Z ]+$/;
    const firstNameValue = this.reservation.firstName.trim();
    
    if (firstNameValue === '') {
      this.firstNameValid = false;
    } else if (!regex.test(firstNameValue) || firstNameValue.length > 50) {
      this.firstNameValid = false;
    } else {
      this.firstNameValid = true;
    }
  }

  checkLastName() {
    const regex = /^[a-zA-Z ]+$/;
    const lastNameValue = this.reservation.lastName.trim();
    
    if (lastNameValue === '') {
      this.lastNameValid = false;
    } else if (!regex.test(lastNameValue) || lastNameValue.length > 50) {
      this.lastNameValid = false;
    } else {
      this.lastNameValid = true;
    }
  }

  checkEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = this.reservation.email.trim();
    
    if (emailValue === '') {
      this.emailValid = false;
    } else if (!regex.test(emailValue) || emailValue.length > 100) {
      this.emailValid = false;
    } else {
      this.emailValid = true;
    }
  }

  checkPhone() {
    const regex = /^[\d+\-()#* ]{7,20}$/;
    const phoneValue = this.reservation.phone.trim();
    
    if (phoneValue === '') {
      this.phoneValid = false;
    } else if (!regex.test(phoneValue)) {
      this.phoneValid = false;
    } else {
      this.phoneValid = true;
    }
  }

  firstNameBlur() {
    this.firstNameTouched = true;
    this.checkFirstName();
  }

  lastNameBlur() {
    this.lastNameTouched = true;
    this.checkLastName();
  }

  emailBlur() {
    this.emailTouched = true;
    this.checkEmail();
  }

  phoneBlur() {
    this.phoneTouched = true;
    this.checkPhone();
  }

  showFirstNameFeedback() {
    return this.firstNameTouched && !this.firstNameValid;
  }

  showLastNameFeedback() {
    return this.lastNameTouched && !this.lastNameValid;
  }

  showEmailFeedback() {
    return this.emailTouched && !this.emailValid;
  }

  showPhoneFeedback() {
    return this.phoneTouched && !this.phoneValid;
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
