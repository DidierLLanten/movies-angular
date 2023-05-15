import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css'],
})
export class AutocompleteActoresComponent implements OnInit {
  control: FormControl = new FormControl();

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((valor) => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(
        (actor) => actor.nombre.indexOf(valor) !== -1
      );
    });
  }

  actores = [
    {
      nombre: 'Al Pacino',
      personaje: '',
      foto: 'https://images.mubicdn.net/images/cast_member/4189/cache-5292-1614585191/image-w856.jpg?size=800x',
    },
    {
      nombre: 'Robert Downey',
      personaje: '',
      foto: 'https://www.californiamuseum.org/sites/main/files/imagecache/lightbox/main-images/robertdowneyjr_cahalloffameinductee.png',
    },
    {
      nombre: 'Brad Pitt',
      personaje: '',
      foto: 'https://images.mubicdn.net/images/cast_member/2552/cache-207-1524922850/image-w856.jpg?size=800x',
    },
    {
      nombre: 'Scarlett Johansson',
      personaje: '',
      foto: 'https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_FMjpg_UX1000_.jpg',
    },
  ];

  actoresOriginal = this.actores;

  actoresSeleccionados = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  optionSelected(event: MatAutocompleteActivatedEvent) {
    console.log(event.option.value);
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
}
