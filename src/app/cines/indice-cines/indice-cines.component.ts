import { Component, OnInit } from '@angular/core';
import { CinesService } from '../cines.service';
import { cineDTO } from '../cine';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css'],
})
export class IndiceCinesComponent implements OnInit {
  constructor(private cinesService: CinesService) {}

  cines: cineDTO[];
  columnasMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosMostrar: number) {
    this.cinesService.obtenerTodos(pagina, cantidadElementosMostrar).subscribe(
      (respuesta: HttpResponse<cineDTO[]>) => {
        console.log('Respuesta: ', respuesta);
        this.cines = respuesta.body;
        this.cantidadTotalRegistros = respuesta.headers.get(
          'cantidadTotalRegistros'
        );
      },
      (error) => console.error('Error obtener cines: ', error)
    );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
  }

  borrar(id: number) {
    this.cinesService.borrar(id).subscribe(
      () => {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosMostrar);
      },
      (error) => console.error(error)
    );
  }
}
