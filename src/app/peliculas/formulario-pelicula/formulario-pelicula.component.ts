import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

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

  ngOnInit(): void {
    this.formPelicula = this.formBuilder.group({
      titulo: ['', { validators: [Validators.required] }],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
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
    this.datosFormPelicula.emit(this.formPelicula.value);
  }
}
