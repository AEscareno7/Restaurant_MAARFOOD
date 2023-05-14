import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  reservations: any[] = [];
  searchTerm: string = '';
  showRow: boolean[] = [];
  category: string = '';

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reservations = this.searchService.getReservations();
    this.showRow = Array(this.reservations.length).fill(false);
    this.route.params.subscribe(params => {
      this.category = params['category'];
      if (this.category) {
        this.searchTerm = this.category;
        this.search();
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
