import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css'],
})
export class ListadoPeliculasComponent implements OnInit {
  constructor() {}
  @Input()
  peliculas;

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.peliculas = [
    //     {
    //       titulo: 'Spider-Man',
    //       fechaLanzamiento: new Date(),
    //       precioEntrada: 19000,
    //     },
    //     {
    //       titulo: 'Moana',
    //       fechaLanzamiento: new Date(),
    //       precioEntrada: 19000,
    //     },
    //     {
    //       titulo: 'John-Wick',
    //       fechaLanzamiento: new Date(),
    //       precioEntrada: 19000,
    //     },
    //     {
    //       titulo: 'Cars',
    //       fechaLanzamiento: new Date(),
    //       precioEntrada: 19000,
    //     },
    //     {
    //       titulo: 'Mario',
    //       fechaLanzamiento: new Date(),
    //       precioEntrada: 19000,
    //     },
    //   ];
    // }, 3000);
  }
}
