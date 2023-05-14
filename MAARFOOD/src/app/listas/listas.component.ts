import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  reservations: any[] = []; // Define the reservations property

  constructor() { }

  ngOnInit(): void {
    // Get the data from the localStorage and set it to the reservations property
    this.reservations = JSON.parse(localStorage.getItem('reservations') ?? '[]');
  }

}
