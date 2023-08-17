import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { generoDTO } from '../genero';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css'],
})
export class IndiceGenerosComponent implements OnInit {
  constructor(private generosService: GenerosService) {}

  generos: generoDTO[];
  columnasMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosMostrar: number) {
    this.generosService
      .obtenerTodos(pagina, cantidadElementosMostrar)
      .subscribe(
        (respuesta: HttpResponse<generoDTO[]>) => {
          console.log('Respuesta: ', respuesta);
          this.generos = respuesta.body;
          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
        },
        (error) => console.error('Error obtener generos: ', error)
      );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  borrar(id: number) {
    this.generosService.borrar(id).subscribe(
      () => {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
      },
      (error) => console.error(error)
    );
  }
}
