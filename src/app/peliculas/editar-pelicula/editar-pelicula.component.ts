import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { actorPeliculaDTO } from 'src/app/actores/actor';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css'],
})
export class EditarPeliculaComponent implements OnInit {
  constructor(
    private peliculasService: PeliculasService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  modeloPeliculaCargada: PeliculaDTO;

  generosNoSeleccionados: MultipleSelectorModel[];
  generosSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  cinesSeleccionados: MultipleSelectorModel[];
  actoresSeleccionados: actorPeliculaDTO[];

  ngOnInit(): void {
    this.activedRoute.params.subscribe((parametros) => {
      this.peliculasService
        .putGet(parametros.id)
        .subscribe((peliculaPutGet) => {
          this.modeloPeliculaCargada = peliculaPutGet.pelicula;

          this.generosNoSeleccionados =
            peliculaPutGet.generosNoSeleccionados.map((genero) => {
              return <MultipleSelectorModel>{
                llave: genero.id,
                valor: genero.nombre,
              };
            });

          this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(
            (genero) => {
              return <MultipleSelectorModel>{
                llave: genero.id,
                valor: genero.nombre,
              };
            }
          );

          this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(
            (cine) => {
              return <MultipleSelectorModel>{
                llave: cine.id,
                valor: cine.nombre,
              };
            }
          );

          this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(
            (cine) => {
              return <MultipleSelectorModel>{
                llave: cine.id,
                valor: cine.nombre,
              };
            }
          );

          this.actoresSeleccionados = peliculaPutGet.actores;
        });
    });
  }

  modificarPelicula(pelicula: PeliculaCreacionDTO) {
    this.peliculasService
      .editar(this.modeloPeliculaCargada.id, pelicula)
      .subscribe(() => {
        this.router.navigate(['/pelicula/' + this.modeloPeliculaCargada.id]);
      });
  }
}
