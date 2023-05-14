import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() items: { src: string, alt: string, platillo:string, preci: string }[] = [ 
    { src: './assets/images/carta/cam-diabla.jpg', alt: 'Descripción de la imagen 1',platillo:'Camarones Diabla',preci:'210'},
  { src: './assets/images/carta/cam-emp.jpg', alt: 'Descripción de la imagen 2' ,platillo:    'Camarones Empanizados',preci:'210'},
  { src: './assets/images/carta/cam-momia.jpg', alt: 'Descripción de la imagen 3' ,platillo:  'Camarones Momia',preci:'250'},
  { src: './assets/images/carta/ceviche-pez.jpg', alt: 'Descripción de la imagen 4' ,platillo:'Ceviche de Pezacado',preci:'60'},
  { src: './assets/images/carta/ceviche-cam.jpg', alt: 'Descripción de la imagen 5' ,platillo:'Ceviche de Camaron',preci:'75'},
  { src: './assets/images/carta/ceviche-pulpo.jpg', alt:'Descripción de la imagen 6',platillo:'Ceviche de pulpo',preci:'100'},
  { src: './assets/images/carta/fil-emp.jpg', alt: 'Descripción de la imagen 7' ,platillo:    'Filete Empanizado',preci:'130'},
  { src: './assets/images/carta/ostiones.jpg', alt: 'Descripción de la imagen 8' ,platillo:   'Ostiones en su concha',preci:'75'},
  { src: './assets/images/carta/pulpos-brasa.jpg', alt: 'Descripción de la imagen 9',platillo:'Pulpo a las Brazas',preci:'300'},
  { src: './assets/images/carta/sopa-mar.jpg', alt: 'Descripción de la imagen 10' ,platillo:'Sopa de Mariscos',preci:'250'}];
  @Input() columns = 5;
  @Input() price: {preci:string}[]=[
  {preci:'210'},
  {preci:'210'},
  {preci:'250'},
  {preci:'60'},
  {preci:'75'},
  {preci:'100'},
  {preci:'200'},
  {preci:'400'},
  {preci:'210'},

  ];
}