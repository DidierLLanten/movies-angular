import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  constructor(private activedRoute: ActivatedRoute, private router: Router) {}

  modeloActorCargado: actorDTO = { nombre: 'Didier', fechaNacimiento: new Date(), foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsGzzD_53wyH3k4iU8gVCNrNN0ziMrZr7ww&usqp=CAU' };

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
