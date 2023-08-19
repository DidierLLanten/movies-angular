import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreacionDTO, actorDTO } from '../actor';
import { ActoresService } from '../actores.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private actoresService: ActoresService
  ) {}
  
  modeloActorCargado: actorDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activedRoute.params.subscribe((parametros) => {
      // alert(parametros.id);
      // console.log('Parametros', parametros);
      this.actoresService.obtenerPorId(parametros.id).subscribe(
        (actor) => {
          this.modeloActorCargado = actor;
        },
        () => this.router.navigate['/actores']
      );
    });
  }

  guardarCambios(actor: actorCreacionDTO) {
    this.actoresService.editar(this.modeloActorCargado.id, actor).subscribe(
      () => {
        this.router.navigate(['/actores']);
      },
      (error) => {
        console.log('Errores al guardar edicion: ', error);
        this.errores = parsearErroresAPI(error);
      }
    );
  }
}
