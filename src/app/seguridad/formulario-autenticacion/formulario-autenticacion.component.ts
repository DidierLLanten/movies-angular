import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from '../seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.css'],
})
export class FormularioAutenticacionComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  form: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  mainAccion: string;

  @Output()
  onSubmit: EventEmitter<credencialesUsuario> = new EventEmitter<credencialesUsuario>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['prueba01@email.com', { validators: [Validators.required, Validators.email] }],
      password: ['pruebA01.', { validtors: [Validators.required] }],
    });
  }

  obtenerMensajeErrorEmail() {
    var campo = this.form.get('email');
    if (campo.hasError('required')) {
      return 'El campo Email es requerido';
    }
    if (campo.hasError('email')) {
      return 'El campo Email no es valido';
    }

    return '';
  }
}
