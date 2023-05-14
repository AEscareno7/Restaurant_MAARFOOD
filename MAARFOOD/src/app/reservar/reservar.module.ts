import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { ListaComponent } from './lista/lista.component';
import { DatepickerModule } from 'ng2-datepicker';



@NgModule({
  declarations: [
    RegistroComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DatepickerModule
  ]
})
export class ReservarModule { }

