import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from 'src/app/actores/actor';
import { cineCreacionDTO } from '../cine';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css'],
})
export class FormularioCineComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  formCine: FormGroup;

  @Output()
  datosFormCine: EventEmitter<cineCreacionDTO> =
    new EventEmitter<cineCreacionDTO>();

  @Input()
  modeloCine: cineCreacionDTO;

  ngOnInit(): void {
    this.formCine = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
        },
      ],
    });

    if (this.modeloCine !== undefined) {
      this.formCine.patchValue(this.modeloCine);
    }
  }

  onSubmit() {
    this.datosFormCine.emit(this.formCine.value);
  }
}
