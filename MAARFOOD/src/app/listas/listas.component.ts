import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  reservations: any[] = [];
  searchTerm: string = '';
  showRow: boolean[] = [];

  constructor() { }

  ngOnInit(): void {
    this.reservations = JSON.parse(localStorage.getItem('reservations') ?? '[]');
    this.showRow = Array(this.reservations.length).fill(false);
  }

  search() {
    this.showRow = this.reservations.map(() => false);
    if (!this.searchTerm) {
      return;
    }
    this.reservations.forEach((reserva, i) => {
      Object.values(reserva).some((value: any) => {
        if (value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())) {
          this.showRow[i] = true;
          return true;
        } else {
          return false;
        }
      });
    });
  }

  isSearchMatch(reserva: any): boolean {
    return this.showRow[this.reservations.indexOf(reserva)];
  }

}
