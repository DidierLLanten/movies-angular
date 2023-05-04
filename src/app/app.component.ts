import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.peliculasEnCines = [
        {
          titulo: 'Spider-Man',
          fechaLanzamiento: new Date(),
          precioEntrada: 19000,
        },
        {
          titulo: 'Moana',
          fechaLanzamiento: new Date(),
          precioEntrada: 19000,
        },
        {
          titulo: 'John-Wick',
          fechaLanzamiento: new Date(),
          precioEntrada: 19000,
        },
        {
          titulo: 'Cars',
          fechaLanzamiento: new Date(),
          precioEntrada: 19000,
        },
        {
          titulo: 'Mario',
          fechaLanzamiento: new Date(),
          precioEntrada: 19000,
        },
      ];
    }, 3000);
  }
  title = 'al valor que yo quiera';

  peliculasEnCines;
  peliculasProximosEstrenos = [];

  duplicarNumero(valor: number): number {
    return valor * 2;
  }

  manejarRated(voto: number): void {
    alert(voto);
  }
}
