import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css'],
})
export class FormularioActoresComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  formActores: FormGroup;

  @Output()
  submit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  @Input()
  modeloActor: actorCreacionDTO;

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
    });

    if (this.modeloActor !== undefined) {
      this.formActores.patchValue(this.modeloActor);
    }
  }

  onSubmit() {
    this.submit.emit(this.formActores.value);
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
