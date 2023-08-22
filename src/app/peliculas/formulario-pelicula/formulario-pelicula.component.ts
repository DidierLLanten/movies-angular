import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { actorPeliculaDTO } from 'src/app/actores/actor';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  formPelicula: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  cargarModeloPelicula: PeliculaDTO;

  @Output()
  datosFormPelicula: EventEmitter<PeliculaCreacionDTO> =
    new EventEmitter<PeliculaCreacionDTO>();

  @Input()
  generosNoSeleccionados: MultipleSelectorModel[] = [];

  generosSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: MultipleSelectorModel[] = [];

  cinesSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  ngOnInit(): void {
    this.formPelicula = this.formBuilder.group({
      titulo: ['', { validators: [Validators.required] }],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: '',
    });

    if (this.cargarModeloPelicula !== undefined) {
      this.formPelicula.patchValue(this.cargarModeloPelicula);
    }
  }

  archivoSeleccionado(archivo: File) {
    this.formPelicula.get('poster').setValue(archivo);
  }

  resumenPelicula(texto: string) {
    this.formPelicula.get('resumen').setValue(texto);
  }

  guardarCambios() {
    const generosIds = this.generosSeleccionados.map((val) => val.llave);
    this.formPelicula.get('generosIds').setValue(generosIds);
    const cinesIds = this.cinesSeleccionados.map((val) => val.llave);
    this.formPelicula.get('cinesIds').setValue(cinesIds);

    const actores = this.actoresSeleccionados.map((val) => {
      return { id: val.id, personaje: val.personaje };
    });
    this.formPelicula.get('actores').setValue(actores);

    this.datosFormPelicula.emit(this.formPelicula.value);
  }
}
