import { Component, OnInit } from '@angular/core';
import { Reservacion } from '../reservacion.model';
import { ReservarService } from '../reservar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [MatPaginator]
})
export class ListaComponent implements OnInit{
  reservar!: Reservacion[];

  constructor(private reservarService: ReservarService){ }

  ngOnInit() {
      this.reservar = this.reservarService.getReservar();
  }
}
