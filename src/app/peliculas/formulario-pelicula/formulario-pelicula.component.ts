import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculaCreacionDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  formPelicula: FormGroup;

  @Input()
  cargarModeloPelicula: any;

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
    }
  }

  guardarCambios() {
    this.datosFormPelicula.emit(this.formPelicula.value);
  }
}
