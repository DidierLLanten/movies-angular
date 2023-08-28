import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas/peliculas.service';
import { PeliculaDTO } from '../peliculas/pelicula';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  peliculasEnCines: PeliculaDTO[];
  peliculasProximosEstrenos: PeliculaDTO[];

  cargarDatos() {
    this.peliculasService.obtenerLandingPage().subscribe((landingPage) => {
      this.peliculasProximosEstrenos = landingPage.proximosEstrenos;
      this.peliculasEnCines = landingPage.enCines;
    });
  }

  borrado() {
    this.cargarDatos();
  }
}
