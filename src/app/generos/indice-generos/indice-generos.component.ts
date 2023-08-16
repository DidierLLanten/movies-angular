import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { generoDTO } from '../genero';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css'],
})
export class IndiceGenerosComponent implements OnInit {
  constructor(private generosService: GenerosService) {}

  generos: generoDTO[];
  columnasMostrar = ['id', 'nombre', 'acciones'];

  ngOnInit(): void {
    this.generosService.obtenerTodos().subscribe(
      (generos) => {
        console.log('generos: ', generos);
        this.generos = generos;
      },
      (error) => console.error('Error obtener generos: ', error)
    );
  }
}
