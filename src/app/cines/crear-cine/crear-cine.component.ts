import { Component } from '@angular/core';
import { cineCreacionDTO } from '../cine';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css'],
})
export class CrearCineComponent {

  guardarCine(cine: cineCreacionDTO) {
    console.log('Cine Guardado: ', cine);
  }
}
