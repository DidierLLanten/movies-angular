import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  constructor(private activedRoute: ActivatedRoute, private router: Router) {}

  modeloActor: actorCreacionDTO = { nombre: 'Didier', fechaNacimiento: new Date() };

  ngOnInit(): void {
    this.activedRoute.params.subscribe((parametros) => {
      // alert(parametros.id);
      // console.log('Parametros', parametros);
    });
  }

  modificarActor(actor: actorCreacionDTO) {
    console.log('modificarActor: ', actor);
    this.router.navigate(['/actores']);
  }
}
