import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css'],
})
export class FormularioActoresComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  formActores: FormGroup;

  @Output()
  OnSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  @Input()
  modeloActor: actorDTO;

  @Input()
  errores: string[] = [];

  ngOnInit(): void {
    this.formActores = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
        },
      ],
      fechaNacimiento: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      foto: '',
      biografia: ''
    });

    if (this.modeloActor !== undefined) {
      this.formActores.patchValue(this.modeloActor);
    }
  }

  onSubmit() {
    this.OnSubmit.emit(this.formActores.value);
  }

  cambioMarkDown(texto: string) {
    this.formActores.get('biografia').setValue(texto);
  }

  archivoSeleccionado(file) {
    this.formActores.get('foto').setValue(file);
  }

  obtenerErrorCampoNombre() {
    const inputNombre = this.formActores.get('nombre');
    if (inputNombre.hasError('required')) {
      return 'El campo nombre es requerido';
    } else if (inputNombre.hasError('minlength')) {
      return 'La longitud minima es de 3 caracteres';
    }
  }

  getErrorInputDate() {
    const inputDate = this.formActores.get('fechaNacimiento');
    console.log('Date picker: ', inputDate.value);
    if (inputDate.value == null) {
      return 'No es una fecha valida';
    } else if (inputDate.hasError('required')) {
      return 'El campo fecha de nacimiento es requerido';
    }
  }
}
