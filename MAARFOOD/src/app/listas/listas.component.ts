import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css'],
})
export class ListasComponent implements OnInit {
  reservations: any[] = [];
  searchTerm: string = '';
  showRow: boolean[] = [];
  category: string = ''; // Se define una variable para almacenar la categoría de búsqueda

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservations = this.searchService.getReservations();
    this.showRow = Array(this.reservations.length).fill(false);
    this.route.params.subscribe((params) => {
      // Se suscribe al cambio de parámetros de la ruta
      this.category = params['category']; // Se obtiene la categoría de búsqueda de los parámetros de la ruta
      if (this.category) {
        // Si existe una categoría de búsqueda
        this.searchTerm = this.category; // Se asigna como término de búsqueda
        this.search(); // Se realiza la búsqueda
      }
    });
  }

  search() {
    this.showRow = this.reservations.map(() => false);
    if (!this.searchTerm) {
      return;
    }
    this.reservations.forEach((reserva, i) => {
      Object.values(reserva).some((value: any) => {
        if (
          value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        ) {
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
