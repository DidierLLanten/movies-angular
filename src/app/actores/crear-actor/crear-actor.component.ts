import { Component } from '@angular/core';
import { actorCreacionDTO } from '../actor';
import { ActoresService } from '../actores.service';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css'],
})
export class CrearActorComponent {
  constructor(private actoresService: ActoresService, private rotuer: Router) {}

  errores = [];

  guardarActor(actor: actorCreacionDTO) {
    this.actoresService.crear(actor).subscribe(
      () => {
        console.log('Actor Guardado: ', actor);
        this.rotuer.navigate(['/actores']);
      },
      (errores) => (this.errores = parsearErroresAPI(errores))
    );
  }
}
