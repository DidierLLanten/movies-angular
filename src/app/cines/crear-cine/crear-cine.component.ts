import { Component } from '@angular/core';
import { cineCreacionDTO } from '../cine';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css'],
})
export class CrearCineComponent {
  errores: string[] = [];

  constructor(private router: Router, private cinesService: CinesService) {}

  guardarCine(cine: cineCreacionDTO) {
    console.log(cine);
    this.cinesService.crear(cine).subscribe(
      () => {
        this.router.navigate(['/cines']);
      },
      (error) => {
        console.log('Errores al crear cine: ', error.error.errors);
        this.errores = parsearErroresAPI(error);
      }
    );
  }
}
