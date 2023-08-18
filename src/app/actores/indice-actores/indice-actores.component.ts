import { Component, OnInit } from '@angular/core';
import { ActoresService } from '../actores.service';
import { actorDTO } from '../actor';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css'],
})
export class IndiceActoresComponent implements OnInit {
  constructor(private actoresService: ActoresService) {}

  actores: actorDTO[];
  columnasMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosMostrar: number) {
    this.actoresService
      .obtenerTodos(pagina, cantidadElementosMostrar)
      .subscribe(
        (respuesta: HttpResponse<actorDTO[]>) => {
          console.log('Respuesta: ', respuesta);
          this.actores = respuesta.body;
          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
        },
        (error) => console.error('Error obtener actores: ', error)
      );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  borrar(id: number) {
    this.actoresService.borrar(id).subscribe(
      () => {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
      },
      (error) => console.error(error)
    );
  }
}
