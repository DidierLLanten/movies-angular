import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  formPelicula: FormGroup;

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

  ngOnInit(): void {
    this.formPelicula = this.formBuilder.group({
      titulo: ['', { validators: [Validators.required] }],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosId: '',
      cinesId: '',
    });

    if (this.cargarModeloPelicula !== undefined) {
      this.formPelicula.patchValue(this.cargarModeloPelicula);
      console.log('Pelicula cargada', this.cargarModeloPelicula);
    }
  }

  archivoSeleccionado(archivo: File) {
    this.formPelicula.get('poster').setValue(archivo);
  }

  resumenPelicula(texto: string) {
    this.formPelicula.get('resumen').setValue(texto);
  }

  guardarCambios() {
    console.log('Generos Seleccionados', this.generosSeleccionados);
    const generosIds = this.generosSeleccionados.map((val) => val.llave);
    this.formPelicula.get('generosId').setValue(generosIds);
    const cinesIds = this.cinesSeleccionados.map((val) => val.llave);
    this.formPelicula.get('cinesId').setValue(cinesIds);
    this.datosFormPelicula.emit(this.formPelicula.value);
  }
}
