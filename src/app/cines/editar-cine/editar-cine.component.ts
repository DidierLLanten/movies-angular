import { Component } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css'],
})
export class EditarCineComponent {
  constructor(private activedRoute: ActivatedRoute, private router: Router) {}

  modeloCineCargado: cineDTO = {
    nombre: 'CineMark',
  };

  ngOnInit(): void {
    this.activedRoute.params.subscribe((parametros) => {
      // alert(parametros.id);
      // console.log('Parametros', parametros);
    });
  }

  modificarCine(cine: cineCreacionDTO) {
    console.log('Cine Editado: ', cine);
    this.router.navigate(['/cines']);
  }
}
