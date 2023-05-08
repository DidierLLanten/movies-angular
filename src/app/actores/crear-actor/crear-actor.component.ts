import { Component } from '@angular/core';
import { actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css'],
})
export class CrearActorComponent {
  guardarActor(actor: actorCreacionDTO) {
    console.log('Actor Guardado: ', actor);
  }
}
