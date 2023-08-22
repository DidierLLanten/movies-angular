import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css'],
})
export class CrearPeliculaComponent implements OnInit {
  constructor(private peliculasService: PeliculasService) {}

  generosNoSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe(
      (resultado) => {
        this.generosNoSeleccionados = resultado.generos.map((genero) => {
          return <MultipleSelectorModel>{
            llave: genero.id,
            valor: genero.nombre,
          };
        });

        this.cinesNoSeleccionados = resultado.cines.map((cine) => {
          return <MultipleSelectorModel>{
            llave: cine.id,
            valor: cine.nombre,
          };
        });
      },
      (error) => console.error(error)
    );
  }
  guardarCambios(pelicula: PeliculaCreacionDTO) {
    console.log('Pelicula creada:', pelicula);
  }
}
