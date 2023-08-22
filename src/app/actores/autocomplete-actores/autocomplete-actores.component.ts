import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { actorPeliculaDTO } from '../actor';
import { ActoresService } from '../actores.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css'],
})
export class AutocompleteActoresComponent implements OnInit {
  constructor(private actoresService: ActoresService) {}
  control: FormControl = new FormControl();

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  actoresAMostrar: actorPeliculaDTO[] = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.cargarRegistros(1, 20);

    this.control.valueChanges.subscribe((nombre) => {
      if (typeof nombre === 'string') {
        this.actoresService.obtenerPorNombre(nombre).subscribe(
          (actores) => {
            this.actoresAMostrar = actores;
            if (nombre === '') {
              this.cargarRegistros(1, 20);
            }
          },
          (error) => {
            console.error('Error en autocompleteOnInit: ', error);
          }
        );
      }
    });
  }

  cargarRegistros(pagina: number, cantidadElementosMostrar: number) {
    this.actoresService
      .obtenerTodos(pagina, cantidadElementosMostrar)
      .subscribe({
        next: (actoresAMostrar: HttpResponse<actorPeliculaDTO[]>) => {
          this.actoresAMostrar = actoresAMostrar.body;
        },
        error: (error) => console.error('Error obtener actores: ', error),
        complete: () => {
          // Se ha completado la suscripción
        },
      });
  }

  optionSelected(event: MatAutocompleteActivatedEvent) {
    console.log('Actor seleccionado: ', event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  eliminar(actor) {
    const indice = this.actoresSeleccionados.findIndex(
      (a) => a.nombre === actor.nombre
    );
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

  finalizaArrastre(event: CdkDragDrop<any[]>) {
    const indicePrevio = this.actoresSeleccionados.findIndex(
      (actor) => actor === event.item.data
    );
    moveItemInArray(
      this.actoresSeleccionados,
      indicePrevio,
      event.currentIndex
    );

    this.table.renderRows();
  }
}
