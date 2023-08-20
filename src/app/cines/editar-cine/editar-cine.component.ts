import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';
import { ActivatedRoute, Router } from '@angular/router';
import { CinesService } from '../cines.service';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css'],
})
export class EditarCineComponent implements OnInit {
  constructor(
    private router: Router,
    private cinesService: CinesService,
    private activatedRoute: ActivatedRoute
  ) {}

  modeloCineCargado: cineDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cinesService.obtenerPorId(params.id).subscribe(
        (cine) => {
          console.log("Cine cargado: ", cine)
          this.modeloCineCargado = cine;
        },
        () => this.router.navigate['/cines']
      );
    });
  }

  modificarCine(cine: cineCreacionDTO) {
    this.cinesService.editar(this.modeloCineCargado.id, cine).subscribe(
      () => {
        this.router.navigate(['/cines']);
      },
      (error) => {
        console.log('Errores al guardar edicion: ', error);
        this.errores = parsearErroresAPI(error);
      }
    );
  }
}

