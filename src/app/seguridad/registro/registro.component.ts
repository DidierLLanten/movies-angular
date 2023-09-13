import { Component } from '@angular/core';
import { credencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  constructor(private seguridadService: SeguridadService) {}

  errores: string[] = [];

  registrar(credenciales: credencialesUsuario) {
    this.seguridadService.registrar(credenciales).subscribe(
      (respuesta) => {
        console.log('Usuario registrado: ', respuesta);
      },
      (errores) => {
        this.errores = parsearErroresAPI(errores);
      }
    );
  }
}
