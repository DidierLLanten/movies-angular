import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from 'src/app/actores/actor';
import { cineCreacionDTO } from '../cine';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';

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

  coordenadaInicial: Coordenada[] = [];

  ngOnInit(): void {
    this.formCine = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
        },
      ],
      latitud: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      longitud: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });

    if (this.modeloCine !== undefined) {
      this.formCine.patchValue(this.modeloCine);
      this.coordenadaInicial.push({
        latitud: this.modeloCine.latitud,
        longitud: this.modeloCine.longitud,
      });
    }
  }

  coordenadaSeleccionada(coordenada: Coordenada) {
    this.formCine.patchValue(coordenada);
  }

  onSubmit() {
    this.datosFormCine.emit(this.formCine.value);
  }
}
