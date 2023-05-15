import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  reservations: any[] = [];

  constructor() { }

  getReservations(): any[] {
    this.reservations = JSON.parse(localStorage.getItem('reservations') ?? '[]');
    return this.reservations;
  }
}